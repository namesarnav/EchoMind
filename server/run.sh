#!/bin/bash

# This script starts the server application
echo "Starting the server application..."

uvicorn main:app --host 127.0.0.1 --port 8888 --reload
echo "Server started on http://127.0.0.1:8888"
