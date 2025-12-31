#!/bin/bash

echo "🔒 Generating SSL certificates for localhost..."

# Create certs directory if it doesn't exist
mkdir -p nginx/certs

# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/certs/localhost-key.pem \
  -out nginx/certs/localhost.pem \
  -subj "/C=FR/ST=IDF/L=Paris/O=FinanceFocus/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1"

echo ""
echo "✅ SSL certificates generated successfully!"
echo ""
echo "📁 Certificate files:"
echo "   - nginx/certs/localhost.pem (certificate)"
echo "   - nginx/certs/localhost-key.pem (private key)"
echo ""
echo "🔒 HTTPS will be available on:"
echo "   - https://localhost:8443"
echo ""
echo "⚠️  Note: This is a self-signed certificate."
echo "   Your browser will show a security warning."
echo "   Click 'Advanced' and 'Proceed to localhost' to continue."
echo ""
