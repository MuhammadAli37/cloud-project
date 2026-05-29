from bs4 import BeautifulSoup
from langchain_core.documents import Document

from main import Config, WebSyncEngine


def _engine():
    return WebSyncEngine.__new__(WebSyncEngine)


def test_extraction_preserves_short_numeric_facts_and_tables():
    html = """
    <html>
      <head><title>Library - Salim Habib University</title></head>
      <body>
        <nav>Menu</nav>
        <main class="elementor">
          <h1>Tariq Amin Library</h1>
          <p>4 floors</p>
          <ul>
            <li>300 users</li>
            <li>12 cubicles</li>
            <li>15000 volumes</li>
          </ul>
          <table>
            <tr><th>Facility</th><th>Detail</th></tr>
            <tr><td>OPAC</td><td>Available</td></tr>
          </table>
        </main>
        <footer>All rights reserved</footer>
      </body>
    </html>
    """
    content = _engine()._extract_content(BeautifulSoup(html, "html.parser"), "https://shu.edu.pk/library/")

    assert "Tariq Amin Library" in content
    assert "4 floors" in content
    assert "300 users" in content
    assert "12 cubicles" in content
    assert "15000 volumes" in content
    assert "Facility | Detail" in content
    assert "OPAC | Available" in content
    assert "All rights reserved" not in content


def test_library_question_facts_are_extracted_from_source_content():
    question = "How many floors does Tariq Amin Library have?"
    expected = "The Tariq Amin Library at Salim Habib University has four floors."
    html = """
    <html>
      <head><title>Facts & Figures - Salim Habib University</title></head>
      <body>
        <main>
          <h1>Tariq Amin Library</h1>
          <table>
            <tr><th>Feature</th><th>Value</th></tr>
            <tr><td>Floors</td><td>Four Floors</td></tr>
            <tr><td>Seating Capacity</td><td>300 users</td></tr>
          </table>
        </main>
      </body>
    </html>
    """
    content = _engine()._extract_content(
        BeautifulSoup(html, "html.parser"),
        "https://shu.edu.pk/library/facts-figures/",
    )

    assert question
    assert expected
    assert "Tariq Amin Library" in content
    assert "Floors | Four Floors" in content
    assert "Seating Capacity | 300 users" in content


def test_library_facilities_question_facts_are_extracted_from_source_content():
    question = "What facilities are available in SHU library?"
    html = """
    <html>
      <head><title>Library - Salim Habib University</title></head>
      <body>
        <main>
          <h1>Tariq Amin Library</h1>
          <p>The split-level library spans four floors.</p>
          <ul>
            <li>Quiet study zones</li>
            <li>Discussion areas</li>
            <li>Digital workstations</li>
            <li>OPAC</li>
            <li>HEC digital library</li>
            <li>Print and digital collections</li>
            <li>Research support</li>
          </ul>
        </main>
      </body>
    </html>
    """
    content = _engine()._extract_content(BeautifulSoup(html, "html.parser"), "https://shu.edu.pk/library/")

    assert question
    for phrase in [
        "split-level library",
        "four floors",
        "Quiet study zones",
        "Discussion areas",
        "Digital workstations",
        "OPAC",
        "HEC digital library",
        "Print and digital collections",
        "Research support",
    ]:
        assert phrase in content


def test_internal_url_rules_and_pdf_detection():
    engine = _engine()

    assert engine._is_internal_url("https://shu.edu.pk/library/")
    assert engine._is_internal_url("https://www.shu.edu.pk/handbook.pdf")
    assert not engine._is_internal_url("https://admissions.shu.edu.pk/")
    assert not engine._is_internal_url("https://example.com/")
    assert engine._is_pdf_url("https://shu.edu.pk/student-handbook.pdf")


def test_priority_seeds_are_crawled_before_recursive_links(monkeypatch):
    engine = _engine()
    engine.pdfs_found = 0
    engine.pdf_chunks_indexed = 0
    engine.urls_indexed = []
    engine.pdf_urls_indexed = []
    visited = []

    original_seeds = WebSyncEngine.SHU_SEEDS
    original_max_pages = Config.MAX_PAGES
    WebSyncEngine.SHU_SEEDS = [
        "https://shu.edu.pk/",
        "https://shu.edu.pk/library/",
        "https://shu.edu.pk/wp-content/uploads/prospectus.pdf",
    ]
    Config.MAX_PAGES = 5

    def fake_fetch_page(url):
        visited.append(url)
        return BeautifulSoup(
            """
            <html><body><main>
              <h1>Tariq Amin Library</h1>
              <p>This page has enough text to be indexed with source facts.</p>
              <a href="https://shu.edu.pk/recursive-page/">Recursive page</a>
            </main></body></html>
            """,
            "html.parser",
        )

    def fake_fetch_pdf(url):
        visited.append(url)
        return [Document(page_content="PDF source with Tariq Amin Library facts", metadata={"source_type": "pdf"})]

    monkeypatch.setattr(engine, "_fetch_page", fake_fetch_page)
    monkeypatch.setattr(engine, "_fetch_pdf", fake_fetch_pdf)

    try:
        engine._crawl_website()
    finally:
        WebSyncEngine.SHU_SEEDS = original_seeds
        Config.MAX_PAGES = original_max_pages

    assert visited[:3] == [
        "https://shu.edu.pk/",
        "https://shu.edu.pk/library",
        "https://shu.edu.pk/wp-content/uploads/prospectus.pdf",
    ]


def test_web_chunking_configuration_matches_required_values():
    assert Config.WEB_CHUNK_SIZE == 1000
    assert Config.WEB_CHUNK_OVERLAP == 250
    assert Config.WEB_RETRIEVER_K >= 15
    assert Config.DOC_RETRIEVER_K >= 12
