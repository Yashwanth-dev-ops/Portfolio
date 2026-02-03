package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	SMTPHost    string
	SMTPPort    string
	SMTPUser    string
	SMTPPass    string
	TargetEmail string // Admin email to receive notifications
}

func LoadConfig() *Config {
	// Load .env file if it exists
	// We don't check for error here because in production (e.g. Docker),
	// env vars might be passed directly without a file.
	_ = godotenv.Load()

	return &Config{
		SMTPHost:    getEnv("SMTP_HOST", "smtp.gmail.com"),
		SMTPPort:    getEnv("SMTP_PORT", "587"),
		SMTPUser:    getEnv("SMTP_USER", ""),
		SMTPPass:    getEnv("SMTP_PASS", ""),
		TargetEmail: getEnv("TARGET_EMAIL", ""),
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
