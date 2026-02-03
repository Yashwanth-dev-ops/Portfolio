# Build Stage
FROM golang:1.24-alpine AS builder

# Install git for fetching dependencies
RUN apk add --no-cache git

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
# -o main app name
# ./cmd/server/main.go path to main file
RUN go build -o main ./cmd/server/main.go

# Run Stage
FROM alpine:latest  

# Add ca-certificates for SMTP (Gmail)
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the Pre-built binary from the previous stage
COPY --from=builder /app/main .

# Copy assets (CV) if they exist
COPY --from=builder /app/assets ./assets

# Expose port
EXPOSE 8080

# Command to run the executable
CMD ["./main"]
