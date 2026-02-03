package database

import (
	"database/sql"
	"log"

	_ "modernc.org/sqlite" // Pure Go SQLite driver
)

var DB *sql.DB

func InitDB() {
	var err error
	// Open (or create) the database file 'portfolio.db'
	DB, err = sql.Open("sqlite", "portfolio.db")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	createTable()
	log.Println("Database connection established and schema verified.")
}

func createTable() {
	query := `
    CREATE TABLE IF NOT EXISTS cv_access_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT,
        status TEXT
    );`

	_, err := DB.Exec(query)
	if err != nil {
		log.Fatal("Failed to create table:", err)
	}
}

func LogDownload(ip, userAgent, status string) {
	query := `INSERT INTO cv_access_logs (ip_address, user_agent, status) VALUES (?, ?, ?)`
	_, err := DB.Exec(query, ip, userAgent, status)
	if err != nil {
		log.Printf("Failed to log download: %v", err)
	}
}
