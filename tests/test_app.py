from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Seed data to show something on initial load
events = [
    {"id": 1, "title": "Tech Conference 2026", "date": "2026-09-15", "location": "Nairobi"},
    {"id": 2, "title": "Local Music Festival", "date": "2026-10-05", "location": "Ruiru"}
]
next_id = 3

@app.route('/')
def index():
    # Renders your index.html template
    return render_template('index.html')

@app.route('/events', methods=['GET'])
def get_events():
    # Return clean, consistent JSON
    return jsonify(events)

@app.route('/events', methods=['POST'])
def add_event():
    global next_id
    # Get JSON payload from client
    data = request.get_json()
    
    # Extract details (adjust keys based on your specific lab requirements)
    title = data.get('title')
    date = data.get('date')
    location = data.get('location')
    
    # Basic validation
    if not title or not date or not location:
        return jsonify({"error": "Missing required fields"}), 400
        
    new_event = {
        "id": next_id,
        "title": title,
        "date": date,
        "location": location
    }
    events.append(new_event)
    next_id += 1
    
    # Return the newly created event and a 201 Created status
    return jsonify(new_event), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)