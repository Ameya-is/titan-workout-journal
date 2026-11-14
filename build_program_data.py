import json
import re

with open("parsed_plan.json", "r", encoding="utf-8") as f:
    days = json.load(f)

# Starting weight suggestions for 77kg athlete
default_weights = {
    "bench top": 60.0,
    "bench back-off": 52.5,
    "pull-ups": 0.0, # bodyweight
    "shoulder press": 16.0,
    "machine row": 45.0,
    "lateral raise": 7.5,
    "triceps": 22.5,
    "curl": 12.5,
    "leg raises": 0.0,
    "leg curl": 35.0,
    "squat": 70.0,
    "rdl": 65.0,
    "hip thrust": 80.0,
    "adductor": 40.0,
    "abductor": 40.0,
    "calf": 75.0,
    "back extension": 10.0,
    "suitcase carry": 20.0,
    "incline bench": 50.0,
    "chest press": 50.0,
    "dips": 0.0,
    "pec deck": 40.0,
    "lat pulldown": 45.0,
    "t-bar row": 40.0,
    "lat prayer": 20.0,
    "rear delt": 35.0,
    "face pull": 20.0,
    "hack squat": 60.0,
    "bulgarian": 12.0,
    "leg extension": 40.0,
    "kettlebell swing": 16.0,
    "plank": 0.0,
    "leg press": 100.0,
    "woodchopper": 15.0
}

def guess_weight(name):
    low = name.lower()
    for k, v in default_weights.items():
        if k in low:
            return v
    return 20.0

parsed_days = []

for d in days:
    day_num = d["day"]
    week = d["week"]
    title = d["title"]
    pre = d.get("preWorkout") or ""
    
    # Subtitle
    sub = ""
    if "(" in title:
        sub = title.split("(")[1].rstrip(")")
        title_clean = title.split("(")[0].strip()
    else:
        title_clean = title
        
    ex_list = []
    for idx, e in enumerate(d["exercises"]):
        raw_name = e["name"]
        
        # Canonical key for cross-day matching
        canon = raw_name
        canon = re.sub(r'\(Superset\s+[AB]\)', '', canon).strip()
        
        # Check min/max reps
        r_text = e["repRange"]
        m = re.search(r'(\d+)[\u2013\-](\d+)', r_text)
        if m:
            min_r = int(m.group(1))
            max_r = int(m.group(2))
        else:
            single = re.search(r'(\d+)', r_text)
            min_r = int(single.group(1)) if single else 10
            max_r = min_r
            
        def_r = int(e["defaultReps"]) if e["defaultReps"].isdigit() else max_r
        
        rest_sec = 90
        rest_m = re.search(r'(\d+)', e["rest"])
        if rest_m:
            rest_sec = int(rest_m.group(1))
            
        is_top_set = "Top Set" in raw_name
        is_back_off = "Back-Off" in raw_name
        
        ex_id = f"d{day_num}_ex{idx+1}"
        
        ex_obj = {
            "id": ex_id,
            "canonName": canon,
            "name": raw_name,
            "sets": e["sets"],
            "repRange": r_text,
            "minReps": min_r,
            "maxReps": max_r,
            "defaultReps": def_r,
            "restSec": rest_sec,
            "cue": e["cue"],
            "superset": e["superset"],
            "isTopSet": is_top_set,
            "isBackOff": is_back_off,
            "defaultWeight": guess_weight(raw_name),
            "videoSearchQuery": f"{raw_name} exercise form tutorial shorts"
        }
        ex_list.append(ex_obj)
        
    parsed_days.append({
        "day": day_num,
        "week": week,
        "title": title_clean,
        "focus": sub or title_clean,
        "preWorkout": pre,
        "exercises": ex_list,
        "isRestDay": len(ex_list) == 0
    })

js_output = "const MASTER_WORKOUT_PROGRAM = " + json.dumps(parsed_days, indent=2) + ";\n"
with open("program_data.js", "w", encoding="utf-8") as out:
    out.write(js_output)

print(f"Generated program_data.js with {len(parsed_days)} days successfully!")
