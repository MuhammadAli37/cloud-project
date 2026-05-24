# =========================
# TERRAFORM VARIABLES SECTION
# =========================
# Variables let deployments change values such as region and network size safely.
variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Application name used as a prefix for all resources"
  type        = string
  default     = "shu-chatbot"
}

variable "environment" {
  description = "Deployment environment (e.g. production, staging)"
  type        = string
  default     = "production"
}

variable "openai_api_key" {
  description = "OpenAI API key passed to the ECS container at runtime as OPENAI_API_KEY"
  type        = string
  sensitive   = true
}

variable "admin_username" {
  description = "Admin username passed to the ECS container at runtime as ADMIN_USERNAME"
  type        = string
  sensitive   = true
}

variable "admin_password" {
  description = "Admin password passed to the ECS container at runtime as ADMIN_PASSWORD"
  type        = string
  sensitive   = true
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "task_cpu" {
  description = "Fargate task CPU units (256 = 0.25 vCPU)"
  type        = number
  default     = 512
}

variable "task_memory" {
  description = "Fargate task memory in MiB"
  type        = number
  default     = 1024
}

variable "desired_count" {
  description = "Number of ECS task instances to run"
  type        = number
  default     = 1
}
