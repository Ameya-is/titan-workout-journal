import re
import json

with open("last_prompt.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Workout section begins at WEEK A
workout_section = text.split("**WEEK A (DAYS 1 TO 7)**")[1]

# Stop before section 3 or notes
if "Okay, so I already want this added" in workout_section:
    workout_section = workout_section.split("Okay, so I already want this added")[0]

day_pattern = r'\*\*Day\s+(\d+)\s*\((Week\s+[AB])\):\s*([^\*]+)\*\*'
splits = list(re.finditer(day_pattern, workout_section))

days_data = []

for idx, match in enumerate(splits):
    day_num = int(match.group(1))
    week = match.group(2).strip()
    day_title = match.group(3).strip()
    
    start_pos = match.end()
    end_pos = splits[idx+1].start() if idx+1 < len(splits) else len(workout_section)
    day_body = workout_section[start_pos:end_pos].strip()
    
    pre_match = re.search(r'\*\s*\*\*Pre-Workout:?\*\*:?\s*(.+)', day_body)
    pre_workout = pre_match.group(1).strip() if pre_match else None
    
    exercises = []
    for line in day_body.splitlines():
        line = line.strip()
        if not line:
            continue
        m = re.match(r'^(?:\d+\.|\*)\s*\*\*([^\*]+)\*\*:?\s*(.+)$', line)
        if m:
            name = m.group(1).rstrip(':').strip()
            details = m.group(2).strip()
            if name.startswith("Pre-Workout") or "Athlete Profile" in name or "Full physical" in name:
                continue
            
            sets_m = re.search(r'(\d+)\s*Sets?', details, re.IGNORECASE)
            if not sets_m:
                sets_m = re.search(r'(\d+)\s*Rounds?', details, re.IGNORECASE)
            sets = int(sets_m.group(1)) if sets_m else 1
            
            reps_m = re.search(r'Rep Range:\s*([^\|]+)', details)
            rep_range = reps_m.group(1).strip() if reps_m else ""
            
            dur_m = re.search(r'Duration:\s*([^\|]+)', details)
            duration = dur_m.group(1).strip() if dur_m else ""
            
            def_reps_m = re.search(r'Default Pre-Fill Reps:\s*([^\|]+)', details)
            default_reps_str = def_reps_m.group(1).strip() if def_reps_m else ""
            
            rest_m = re.search(r'Rest:\s*([^\|]+)', details)
            rest_str = rest_m.group(1).strip() if rest_m else ""
            
            cue_m = re.search(r'Cue:\s*(.+)$', details)
            cue_str = cue_m.group(1).strip() if cue_m else ""
            
            superset = None
            if "Superset A" in name:
                superset = "A"
                name = name.replace("(Superset A)", "").strip()
            elif "Superset B" in name:
                superset = "B"
                name = name.replace("(Superset B)", "").strip()
            
            exercises.append({
                "name": name,
                "sets": sets,
                "repRange": rep_range or duration,
                "defaultReps": default_reps_str,
                "rest": rest_str,
                "cue": cue_str,
                "superset": superset,
                "rawDetails": details
            })
        
    days_data.append({
        "day": day_num,
        "week": week,
        "title": day_title,
        "preWorkout": pre_workout,
        "exercises": exercises
    })

print(f"Parsed {len(days_data)} days.")
for d in days_data:
    print(f"Day {d['day']} ({d['week']}) - {d['title']}: {len(d['exercises'])} exercises")

with open("parsed_plan.json", "w", encoding="utf-8") as out:
    json.dump(days_data, out, indent=2)
