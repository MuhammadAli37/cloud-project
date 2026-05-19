# =========================
# TERRAFORM LOCALS SECTION
# =========================
# Locals define shared names and tags so AWS resources stay consistent.
locals {
  name_prefix = "${var.app_name}-${var.environment}"

  common_tags = {
    Project     = var.app_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
