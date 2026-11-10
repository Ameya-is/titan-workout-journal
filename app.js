/**
 * DIARY OF A WIMPY KID - WORKOUT JOURNAL & PROGRESSION ENGINE
 * The Master 14-Day (Week A / Week B) Science-Based Hypertrophy, Core & Vitality Program
 * Athlete Profile: 6'3" (190.5 cm) | 77 kg Lean Bulk | 75-85 min Cap
 */

// ==========================================
// 1. MASTER 14-DAY ROTATING PROGRAM SPEC
// ==========================================
const PROGRAM_SPLIT = {
  profile: {
    height: "6'3\" (190.5 cm)",
    weight: "77 kg (Lean Bulking Phase)",
    durationCap: "75 to 85 minutes (Strictly under 90 mins to protect testosterone)",
    protocol: "8-10 mins Zone 2 Incline Treadmill Walking (3.5% incline, 5.2 km/h) for eNOS & synovial warmth",
    progressionRule: "Double Progression: Hold load until top rep ceiling hit across sets at 1-2 RIR, then bump +2.5kg (or 1 pin) next session"
  },
  days: {
    // ----------------------------------------------------
    // WEEK A (DAYS 1 TO 7)
    // ----------------------------------------------------
    1: {
      week: "A",
      dayNumber: 1,
      title: "Upper Body (Heavy Compound, Frame Width & Lower Abs)",
      type: "workout",
      tag: "Week A - Upper",
      exercises: [
        {
          id: "wA_d1_bench",
          name: "Flat Barbell Bench Press",
          sets: 3,
          minReps: 4,
          maxReps: 6,
          restSec: 180,
          restLabel: "3 min",
          isTopSetProtocol: true,
          type: "barbell",
          notes: "1 Top Set x 4-6 reps (RPE 8.5), 2 Back-off Sets x 6-8 reps. Lower over 3s to chest, drive up explosively."
        },
        {
          id: "wA_d1_pullups",
          name: "Wide-Grip Pull-Ups (Weighted or BW + Bottom Partials)",
          sets: 4,
          minReps: 6,
          maxReps: 10,
          restSec: 150,
          restLabel: "2.5 min",
          type: "calisthenic",
          notes: "Pull chest to bar; after full-range failure, perform 3-4 bottom-half stretch partials."
        },
        {
          id: "wA_d1_db_press",
          name: "Seated Dumbbell Shoulder Press (Bench at 75°)",
          sets: 3,
          minReps: 8,
          maxReps: 10,
          restSec: 120,
          restLabel: "2 min",
          type: "dumbbell",
          notes: "Press in the scapular plane (elbows tucked 30 degrees forward)."
        },
        {
          id: "wA_d1_row",
          name: "Horizontal Two-Handle Machine Row",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "machine",
          notes: "Let shoulder blades protract at the bottom stretch, squeeze mid-back on contraction."
        },
        {
          id: "wA_d1_lat_raise",
          name: "Wrist-Height Cable Lateral Raise",
          sets: 4,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "cable",
          notes: "Set pulley to wrist height for peak tension in the bottom stretched position of the side delt."
        },
        {
          id: "wA_d1_arm_superset",
          name: "Arm Superset — Overhead Cable Triceps Ext + Bayesian Curl",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "superset",
          notes: "3 sets x 10-12 reps each. Step forward on curls so cable pulls arm behind torso for max bicep stretch."
        },
        {
          id: "wA_d1_core",
          name: "Core Finisher — Captain's Chair Leg Raises",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "core",
          notes: "Actively curl your pelvis/tailbone off the back pad at the top to isolate the lower rectus abdominis."
        }
      ]
    },
    2: {
      week: "A",
      dayNumber: 2,
      title: "Lower Body A (Strength, Pelvic Perfusion & Lower Back Armor)",
      type: "workout",
      tag: "Week A - Lower A",
      exercises: [
        {
          id: "wA_d2_leg_curl",
          name: "Lying Leg Curl (Pre-Activation)",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "Keep hips pressed into pad; warms up knee joint before heavy squats."
        },
        {
          id: "wA_d2_squat",
          name: "Barbell Back Squat",
          sets: 3,
          minReps: 5,
          maxReps: 8,
          restSec: 180,
          restLabel: "3 min",
          type: "barbell",
          notes: "360-degree core brace, sit deep between hips, drive through mid-foot."
        },
        {
          id: "wA_d2_rdl",
          name: "Barbell Romanian Deadlift (RDL)",
          sets: 3,
          minReps: 6,
          maxReps: 8,
          restSec: 180,
          restLabel: "3 min",
          type: "barbell",
          notes: "Push hips straight back, stop bar mid-shin to keep 100% tension on hamstrings and glutes."
        },
        {
          id: "wA_d2_hip_thrust",
          name: "Barbell Hip Thrust (Flat Bench)",
          sets: 3,
          minReps: 8,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "barbell",
          notes: "Inhale to relax pelvic floor on descent, exhale & hold 2s glute & pelvic floor lockout at top."
        },
        {
          id: "wA_d2_pelvic_superset",
          name: "Pelvic Superset — Seated Hip Adductor + Seated Hip Abductor",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "superset",
          notes: "3 sets x 12-15 each. On Adductors: 3-second slow eccentric stretch to lengthen pelvic floor before squeezing."
        },
        {
          id: "wA_d2_calves",
          name: "Leg Press Calf Raises (Toe Press)",
          sets: 4,
          minReps: 12,
          maxReps: 15,
          restSec: 60,
          restLabel: "60 sec",
          type: "machine",
          notes: "2-second pause in deep bottom stretch on every rep. Strict control."
        },
        {
          id: "wA_d2_finisher",
          name: "Finisher — 45° Weighted Back Ext + Heavy KB Suitcase Carry",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "finisher",
          notes: "Back Extensions (plate/KB to chest) superset with 30m one-arm walk/hand (anti-lateral flexion)."
        }
      ]
    },
    3: {
      week: "A",
      dayNumber: 3,
      title: "Active Recovery & Pelvic Mobility",
      type: "recovery",
      tag: "Week A - Recovery",
      description: "25–30 minutes outdoor brisk walk or light stationary cycle + pelvic floor & hip mobility release.",
      checklist: [
        "25-30 min brisk walk or light stationary cycle (Zone 1 cardio)",
        "Pelvic Floor Release: 2 sets x 60-second relaxed Deep Squat Hold (breathe deep into lower belly)",
        "Deep Couch Stretch for hip flexors & psoas (90 sec per side)",
        "Thoracic spine open-book rotations (2 sets x 10 reps)",
        "Hydration & mineral repletion (3.5L water with sodium & magnesium)"
      ]
    },
    4: {
      week: "A",
      dayNumber: 4,
      title: "Push (Upper Chest, Delts & Weighted Six-Pack Thickness)",
      type: "workout",
      tag: "Week A - Push",
      exercises: [
        {
          id: "wA_d4_incline_bench",
          name: "Incline Barbell Bench Press (30° Bench)",
          sets: 3,
          minReps: 8,
          maxReps: 10,
          restSec: 150,
          restLabel: "2.5 min",
          type: "barbell",
          notes: "Slight pause on upper chest to bias the clavicular pec fibers."
        },
        {
          id: "wA_d4_chest_press",
          name: "Machine Chest Press",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "machine",
          notes: "Push close to failure (0-1 RIR) safely using machine stability."
        },
        {
          id: "wA_d4_dips",
          name: "Captain's Chair Chest Dips",
          sets: 3,
          minReps: 8,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "calisthenic",
          notes: "Lean torso 20 degrees forward, lower into comfortable bottom stretch."
        },
        {
          id: "wA_d4_pec_deck",
          name: "Pec Deck Fly",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "Hold the back stretched position for 2 seconds on every rep."
        },
        {
          id: "wA_d4_cable_lateral",
          name: "Behind-the-Back Cable Lateral Raise",
          sets: 4,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "cable",
          notes: "Cable runs behind your glutes to load the lateral delt at maximum stretch."
        },
        {
          id: "wA_d4_pressdown",
          name: "Cable Triceps Pressdown (Bar or Rope)",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "cable",
          notes: "Keep elbows locked at your sides; squeeze triceps at lockout."
        },
        {
          id: "wA_d4_crunch",
          name: "Core Finisher — High-Pulley Kneeling Cable Crunch",
          sets: 3,
          minReps: 10,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "core",
          notes: "Lock hips still and flex upper spine downward (ribcage toward pelvis)."
        }
      ]
    },
    5: {
      week: "A",
      dayNumber: 5,
      title: "Pull (V-Taper Width, Rear Delts, Lower Back & Obliques)",
      type: "workout",
      tag: "Week A - Pull",
      exercises: [
        {
          id: "wA_d5_lat_pulldown",
          name: "Dual-Cable Lat Pulldown",
          sets: 4,
          minReps: 10,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "cable",
          notes: "Drive elbows down into your hips, full stretch at the top."
        },
        {
          id: "wA_d5_tbar_row",
          name: "Heavy T-Bar Row (With Lifting Straps)",
          sets: 3,
          minReps: 8,
          maxReps: 10,
          restSec: 150,
          restLabel: "2.5 min",
          type: "barbell",
          notes: "Let shoulder blades protract at bottom, row hard into sternum."
        },
        {
          id: "wA_d5_lat_prayer",
          name: "Single-Arm Cable Lat Prayer (Pullover)",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "cable",
          notes: "Sweep cable in an arc from overhead down to hip."
        },
        {
          id: "wA_d5_rev_pec_deck",
          name: "Reverse Pec Deck (Rear Delt Fly)",
          sets: 4,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "Push hands outward in a wide arc rather than pinching shoulder blades."
        },
        {
          id: "wA_d5_face_pulls",
          name: "Cable Face Pulls",
          sets: 3,
          minReps: 15,
          maxReps: 15,
          restSec: 60,
          restLabel: "60 sec",
          type: "cable",
          notes: "Pull rope to forehead with external shoulder rotation."
        },
        {
          id: "wA_d5_curls_combo",
          name: "Bicep Stretch Superset — Incline DB Curl (45–60°) + Hammer Curl",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "dumbbell",
          notes: "3 sets x 10-12 reps each. Full stretch at bottom of incline bench."
        },
        {
          id: "wA_d5_finisher",
          name: "Lower Back & Core — 45° Back Ext + High-to-Low Cable Woodchoppers",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "finisher",
          notes: "Back Extensions (12-15) superset with Cable Woodchoppers (12/side for obliques)."
        }
      ]
    },
    6: {
      week: "A",
      dayNumber: 6,
      title: "Legs B (Quad Sweep, Unilateral Hip Stretch & Explosive Hip Drive)",
      type: "workout",
      tag: "Week A - Legs B",
      exercises: [
        {
          id: "wA_d6_hack_squat",
          name: "Deep Hack Squat Machine",
          sets: 3,
          minReps: 8,
          maxReps: 12,
          restSec: 180,
          restLabel: "3 min",
          type: "machine",
          notes: "Feet shoulder-width on lower platform, descend until hamstrings cover calves, 1s bottom pause."
        },
        {
          id: "wA_d6_split_squat",
          name: "Dumbbell Bulgarian Split Squat (Back Foot on Bench)",
          sets: 3,
          minReps: 8,
          maxReps: 10,
          restSec: 120,
          restLabel: "2 min",
          type: "dumbbell",
          notes: "Lean torso slightly forward and sink deep to stretch the glutes and hip flexors."
        },
        {
          id: "wA_d6_adductor",
          name: "Seated Hip Adductor Machine",
          sets: 3,
          minReps: 10,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "3-second slow eccentric into full inner-thigh stretch, smooth squeeze inward."
        },
        {
          id: "wA_d6_leg_ext",
          name: "Leg Extension",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "1-second squeeze at top, 3-second controlled descent."
        },
        {
          id: "wA_d6_leg_curl",
          name: "Lying Leg Curl",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "Perform 5 bottom-half partial reps after reaching full-range failure on final set."
        },
        {
          id: "wA_d6_calves",
          name: "Leg Press Calf Raises",
          sets: 4,
          minReps: 15,
          maxReps: 15,
          restSec: 60,
          restLabel: "60 sec",
          type: "machine",
          notes: "4 sets x 15 reps. Deep stretch, high peak contraction."
        },
        {
          id: "wA_d6_finisher",
          name: "Explosive Finisher — Kettlebell Swings + Hard-Style Plank",
          sets: 3,
          minReps: 15,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "finisher",
          notes: "3 sets x 15 explosive KB swings + 60s maximum-tension hard-style plank."
        },
        {
          id: "wA_d6_decompression",
          name: "Post-Workout Decompression — Deep Squat Pelvic Release",
          sets: 2,
          minReps: 1,
          maxReps: 1,
          restSec: 60,
          restLabel: "60 sec",
          type: "recovery",
          notes: "2 sets x 60-second Deep Squat Pelvic Release Hold (relaxed deep belly breathing)."
        }
      ]
    },
    7: {
      week: "A",
      dayNumber: 7,
      title: "Complete Rest (End of Week A)",
      type: "rest",
      tag: "Week A - Rest",
      description: "Full rest and central nervous system recovery. Tomorrow begins Week B!",
      checklist: [
        "8 to 9 hours of deep restorative sleep",
        "Hit lean bulking surplus & 2g/kg protein target",
        "Prepare mentally for Week B rotation (Leg Press Wide/High & VO2 Max HIIT)"
      ]
    },

    // ----------------------------------------------------
    // WEEK B (DAYS 8 TO 14)
    // ----------------------------------------------------
    8: {
      week: "B",
      dayNumber: 8,
      title: "Upper Body (Heavy Compound, Frame Width & Lower Abs)",
      type: "workout",
      tag: "Week B - Upper",
      exercises: [
        {
          id: "wB_d8_bench",
          name: "Flat Barbell Bench Press",
          sets: 3,
          minReps: 4,
          maxReps: 6,
          restSec: 180,
          restLabel: "3 min",
          isTopSetProtocol: true,
          type: "barbell",
          notes: "1 Top Set x 4-6 reps (RPE 8.5), 2 Back-off Sets x 6-8 reps (3 min rest)."
        },
        {
          id: "wB_d8_pullups",
          name: "Wide-Grip Pull-Ups (Weighted or BW + Bottom Partials)",
          sets: 4,
          minReps: 6,
          maxReps: 10,
          restSec: 150,
          restLabel: "2.5 min",
          type: "calisthenic",
          notes: "Pull chest to bar; perform bottom-half stretch partials on final set."
        },
        {
          id: "wB_d8_db_press",
          name: "Seated Dumbbell Shoulder Press (Bench at 75°)",
          sets: 3,
          minReps: 8,
          maxReps: 10,
          restSec: 120,
          restLabel: "2 min",
          type: "dumbbell",
          notes: "Press in scapular plane with elbows tucked 30 degrees forward."
        },
        {
          id: "wB_d8_row",
          name: "Horizontal Two-Handle Machine Row",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "machine",
          notes: "Protract shoulder blades at stretch, squeeze mid-back on contraction."
        },
        {
          id: "wB_d8_lat_raise",
          name: "Wrist-Height Cable Lateral Raise",
          sets: 4,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "cable",
          notes: "Wrist height pulley for peak lateral delt stretch tension."
        },
        {
          id: "wB_d8_arm_superset",
          name: "Arm Superset — Overhead Cable Triceps Ext + Bayesian Curl",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "superset",
          notes: "3 sets x 10-12 reps each. Maximally stretch bicep behind torso on curls."
        },
        {
          id: "wB_d8_core",
          name: "Core Finisher — Captain's Chair Leg Raises",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "core",
          notes: "Actively curl pelvis upward off back pad to fire lower rectus abdominis."
        }
      ]
    },
    9: {
      week: "B",
      dayNumber: 9,
      title: "Lower Body A (Strength, Adductor Mass & Lower Back Armor)",
      type: "workout",
      tag: "Week B - Lower A",
      exercises: [
        {
          id: "wB_d9_leg_curl",
          name: "Lying Leg Curl (Pre-Activation)",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "Hamstring primer before squats. Keep hips glued to pad."
        },
        {
          id: "wB_d9_squat",
          name: "Barbell Back Squat",
          sets: 3,
          minReps: 5,
          maxReps: 8,
          restSec: 180,
          restLabel: "3 min",
          type: "barbell",
          notes: "360-degree core brace, sit deep between hips, drive mid-foot."
        },
        {
          id: "wB_d9_rdl",
          name: "Barbell Romanian Deadlift (RDL)",
          sets: 3,
          minReps: 6,
          maxReps: 8,
          restSec: 180,
          restLabel: "3 min",
          type: "barbell",
          notes: "Push hips back, stop bar mid-shin for maximum hamstring stretch tension."
        },
        {
          id: "wB_d9_leg_press",
          name: "Leg Press (Wide & High Foot Placement)",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "machine",
          notes: "Deep descent to bias glutes, adductors, and overall thigh mass."
        },
        {
          id: "wB_d9_pelvic_superset",
          name: "Pelvic Superset — Seated Hip Adductor + Seated Hip Abductor",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "superset",
          notes: "3 sets x 12-15 each. 3-second slow eccentric stretch on Adductors."
        },
        {
          id: "wB_d9_calves",
          name: "Leg Press Calf Raises (Toe Press)",
          sets: 4,
          minReps: 12,
          maxReps: 15,
          restSec: 60,
          restLabel: "60 sec",
          type: "machine",
          notes: "Strict 2-second pause in deep bottom stretch on every rep."
        },
        {
          id: "wB_d9_finisher",
          name: "Finisher — 45° Weighted Back Ext + Heavy KB Suitcase Carry",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "finisher",
          notes: "3 sets x 12-15 reps superset with 30m walk per hand."
        }
      ]
    },
    10: {
      week: "B",
      dayNumber: 10,
      title: "Active Recovery & Pelvic Mobility",
      type: "recovery",
      tag: "Week B - Recovery",
      description: "25–30 minutes outdoor brisk walk or light stationary cycle + pelvic floor release & hip mobility.",
      checklist: [
        "25-30 min brisk walk or light cycle (keep HR under 120 bpm)",
        "Pelvic Floor Release: 2 sets x 60-second relaxed Deep Squat Hold",
        "5 minutes hip flexor & psoas stretching",
        "Thoracic rotation openers & cat-cow flow"
      ]
    },
    11: {
      week: "B",
      dayNumber: 11,
      title: "Push (Upper Chest, Delts & Weighted Six-Pack Thickness)",
      type: "workout",
      tag: "Week B - Push",
      exercises: [
        {
          id: "wB_d11_incline_bench",
          name: "Incline Barbell Bench Press (30° Bench)",
          sets: 3,
          minReps: 8,
          maxReps: 10,
          restSec: 150,
          restLabel: "2.5 min",
          type: "barbell",
          notes: "Slight pause on upper chest to bias the clavicular pec fibers."
        },
        {
          id: "wB_d11_chest_press",
          name: "Machine Chest Press",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "machine",
          notes: "Push close to failure (0-1 RIR) safely using machine stability."
        },
        {
          id: "wB_d11_dips",
          name: "Captain's Chair Chest Dips",
          sets: 3,
          minReps: 8,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "calisthenic",
          notes: "Torso 20 degrees forward lean for chest bias."
        },
        {
          id: "wB_d11_pec_deck",
          name: "Pec Deck Fly",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "Hold back stretched position for 2 seconds on every rep."
        },
        {
          id: "wB_d11_cable_lateral",
          name: "Behind-the-Back Cable Lateral Raise",
          sets: 4,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "cable",
          notes: "Cable behind glutes for maximum stretch tension on lateral delts."
        },
        {
          id: "wB_d11_pressdown",
          name: "Cable Triceps Pressdown (Bar or Rope)",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "cable",
          notes: "Elbows pinned at sides; hard contraction."
        },
        {
          id: "wB_d11_crunch",
          name: "Core Finisher — High-Pulley Kneeling Cable Crunch",
          sets: 3,
          minReps: 10,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "core",
          notes: "Flex upper spine downward (ribcage to pelvis)."
        }
      ]
    },
    12: {
      week: "B",
      dayNumber: 12,
      title: "Pull (V-Taper Width, Rear Delts, Lower Back & Obliques)",
      type: "workout",
      tag: "Week B - Pull",
      exercises: [
        {
          id: "wB_d12_lat_pulldown",
          name: "Dual-Cable Lat Pulldown",
          sets: 4,
          minReps: 10,
          maxReps: 12,
          restSec: 120,
          restLabel: "2 min",
          type: "cable",
          notes: "Drive elbows into hips, full lat stretch at top."
        },
        {
          id: "wB_d12_tbar_row",
          name: "Heavy T-Bar Row (With Lifting Straps)",
          sets: 3,
          minReps: 8,
          maxReps: 10,
          restSec: 150,
          restLabel: "2.5 min",
          type: "barbell",
          notes: "Shoulder blades protract at bottom, row hard into sternum."
        },
        {
          id: "wB_d12_lat_prayer",
          name: "Single-Arm Cable Lat Prayer (Pullover)",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "cable",
          notes: "Arc from overhead down to hip."
        },
        {
          id: "wB_d12_rev_pec_deck",
          name: "Reverse Pec Deck (Rear Delt Fly)",
          sets: 4,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "Push outward in wide arc for pure rear delt work."
        },
        {
          id: "wB_d12_face_pulls",
          name: "Cable Face Pulls",
          sets: 3,
          minReps: 15,
          maxReps: 15,
          restSec: 60,
          restLabel: "60 sec",
          type: "cable",
          notes: "Pull rope to forehead with external rotation."
        },
        {
          id: "wB_d12_curls_combo",
          name: "Bicep Stretch Superset — Incline DB Curl + Hammer Curl",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "dumbbell",
          notes: "3 sets x 10-12 reps each."
        },
        {
          id: "wB_d12_finisher",
          name: "Lower Back & Core — 45° Back Ext + High-to-Low Cable Woodchoppers",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "finisher",
          notes: "3 sets x 12-15 reps superset with 3 sets x 12 reps per side."
        }
      ]
    },
    13: {
      week: "B",
      dayNumber: 13,
      title: "Legs B (Quad Sweep, Pelvic Blood Flow & VO2 Max HIIT)",
      type: "workout",
      tag: "Week B - Legs B",
      exercises: [
        {
          id: "wB_d13_hack_squat",
          name: "Deep Hack Squat Machine",
          sets: 3,
          minReps: 8,
          maxReps: 12,
          restSec: 180,
          restLabel: "3 min",
          type: "machine",
          notes: "Hamstrings cover calves, 1-second pause in bottom."
        },
        {
          id: "wB_d13_pelvic_superset",
          name: "Pelvic Superset — Seated Hip Adductor + Seated Hip Abductor",
          sets: 3,
          minReps: 10,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "superset",
          notes: "Heavy focus on 3s stretched open position on Adductors followed by full squeeze."
        },
        {
          id: "wB_d13_split_squat",
          name: "Dumbbell Bulgarian Split Squat (Or Walking Lunges)",
          sets: 3,
          minReps: 8,
          maxReps: 10,
          restSec: 120,
          restLabel: "2 min",
          type: "dumbbell",
          notes: "3 sets x 8-10 reps per leg (2 min rest)."
        },
        {
          id: "wB_d13_leg_ext",
          name: "Leg Extension",
          sets: 3,
          minReps: 12,
          maxReps: 15,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "3-second slow lowering (eccentric)."
        },
        {
          id: "wB_d13_leg_curl",
          name: "Lying Leg Curl",
          sets: 3,
          minReps: 10,
          maxReps: 12,
          restSec: 90,
          restLabel: "90 sec",
          type: "machine",
          notes: "Finish last set with 5 bottom-half partial reps."
        },
        {
          id: "wB_d13_calves",
          name: "Leg Press Calf Raises",
          sets: 4,
          minReps: 15,
          maxReps: 15,
          restSec: 60,
          restLabel: "60 sec",
          type: "machine",
          notes: "4 sets x 15 reps."
        },
        {
          id: "wB_d13_vo2max",
          name: "Nitric Oxide Finisher — Rowing / SkiErg VO2 Max HIIT",
          sets: 4,
          minReps: 1,
          maxReps: 1,
          restSec: 90,
          restLabel: "90 sec",
          type: "finisher",
          notes: "4 Rounds of 30 seconds ALL-OUT maximum effort followed by 90 seconds slow recovery pacing."
        },
        {
          id: "wB_d13_decompression",
          name: "Post-Workout Decompression — Deep Squat Pelvic Release Hold",
          sets: 2,
          minReps: 1,
          maxReps: 1,
          restSec: 60,
          restLabel: "60 sec",
          type: "recovery",
          notes: "2 sets x 60-second Deep Squat Pelvic Release Hold (relaxed deep belly breathing)."
        }
      ]
    },
    14: {
      week: "B",
      dayNumber: 14,
      title: "Complete Rest (End of 14-Day Macrocycle)",
      type: "rest",
      tag: "Week B - Rest",
      description: "14-Day Block Completed! Full rest and review your weekly progressive overload before looping back to Day 1 (Week A).",
      checklist: [
        "Full 8-9 hours sleep and complete muscle recovery",
        "Record 77kg morning weigh-in progress",
        "Prepare nutrition and grocery run for next 14-day block"
      ]
    }
  }
};

// ==========================================
// 2. STATE MANAGEMENT & STORAGE
// ==========================================
const STORAGE_KEYS = {
  SESSIONS: "wimpy_workout_sessions_v2",
  SETTINGS: "wimpy_workout_settings_v2",
  VIDEOS: "wimpy_exercise_videos_v1",
  CROSSED: "wimpy_crossed_exercises_v1",
  NUTRITION: "wimpy_quick_nutrition_v1"
};

let appState = {
  selectedDate: new Date().toISOString().split("T")[0],
  currentDay: 1,
  currentWeek: "A",
  currentTab: "logger",
  timerSecondsRemaining: 0,
  timerInterval: null,
  timerIsPaused: false,
  wakeLock: null,
  deferredPrompt: null
};

function getStoredSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveStoredSessions(sessions) {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (e) {}
}

function getStoredVideos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VIDEOS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveStoredVideo(exerciseId, url) {
  const vids = getStoredVideos();
  vids[exerciseId] = url;
  localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(vids));
}

function getCrossedExercises(dateStr) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CROSSED);
    const data = raw ? JSON.parse(raw) : {};
    return data[dateStr] || {};
  } catch (e) {
    return {};
  }
}

function setCrossedExercise(dateStr, exerciseId, isCrossed) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CROSSED);
    const data = raw ? JSON.parse(raw) : {};
    if (!data[dateStr]) data[dateStr] = {};
    data[dateStr][exerciseId] = isCrossed;
    localStorage.setItem(STORAGE_KEYS.CROSSED, JSON.stringify(data));
  } catch (e) {}
}

function getStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : { currentDay: 1, currentWeek: "A" };
  } catch (e) {
    return { currentDay: 1, currentWeek: "A" };
  }
}

function saveStoredSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

// ==========================================
// 3. SOUND SYNTHESIZER & HAPTIC VIBRATION
// ==========================================
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function triggerHaptic(duration = 40) {
  if (navigator.vibrate) {
    try { navigator.vibrate(duration); } catch(e) {}
  }
}

// Realistic scratchy pen scribble sound
function playScribbleSound() {
  triggerHaptic([30, 20, 40]);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(600 + Math.random() * 400, now + i * 0.07);
      gain.gain.setValueAtTime(0.12, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.07 + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.06);
    }
  } catch(e) {}
}

function playPenClickSound() {
  triggerHaptic(30);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
}

function playChimeSound() {
  triggerHaptic([60, 40, 80]);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.55);
    });
  } catch (e) {}
}

function playTimerFinishedAlarm() {
  triggerHaptic([150, 100, 150, 100, 200]);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(880, ctx.currentTime + i * 0.25);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.25 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.25);
      osc.stop(ctx.currentTime + i * 0.25 + 0.2);
    }
  } catch (e) {}
}

// ==========================================
// 4. SCREEN WAKELOCK (PREVENT PHONE SLEEP)
// ==========================================
async function toggleWakeLock() {
  const btn = document.getElementById("btnWakeLock");
  if (!navigator.wakeLock) {
    alert("Screen WakeLock API not supported by this browser. Keep your phone screen set to long timeout.");
    return;
  }

  if (appState.wakeLock) {
    try {
      await appState.wakeLock.release();
      appState.wakeLock = null;
      if (btn) {
        btn.textContent = "☀️ Screen Awake: Off";
        btn.classList.remove("active");
      }
    } catch(e) {}
  } else {
    try {
      appState.wakeLock = await navigator.wakeLock.request('screen');
      if (btn) {
        btn.textContent = "☀️ Screen Awake: ON";
        btn.classList.add("active");
      }
      appState.wakeLock.addEventListener('release', () => {
        appState.wakeLock = null;
        if (btn) {
          btn.textContent = "☀️ Screen Awake: Off";
          btn.classList.remove("active");
        }
      });
    } catch (err) {}
  }
}

// ==========================================
// 5. SMART PROGRESSIVE OVERLOAD ENGINE
// ==========================================
function calculateOverloadRecommendation(exercise, prevLogs) {
  if (!prevLogs || prevLogs.length === 0) {
    return {
      status: "baseline",
      suggestedWeight: null,
      message: "First session for this lift! Choose a working weight allowing 1-2 reps in reserve (RIR)."
    };
  }

  const validSessions = prevLogs.filter(s => s.sets && s.sets.some(set => (set.weight > 0 || set.reps > 0) && set.done));
  if (validSessions.length === 0) {
    return {
      status: "baseline",
      suggestedWeight: null,
      message: "Establish initial working weight with strict tempo and full stretch."
    };
  }

  const lastSession = validSessions[validSessions.length - 1];
  const completedSets = lastSession.sets.filter(s => s.done);
  if (completedSets.length === 0) {
    return { status: "baseline", suggestedWeight: null, message: "No completed sets recorded in last session." };
  }

  const maxPrescribedReps = exercise.maxReps || 10;
  const minPrescribedReps = exercise.minReps || 6;
  const maxWeight = Math.max(...completedSets.map(s => parseFloat(s.weight) || 0));
  const repsCompleted = completedSets.map(s => parseInt(s.reps, 10) || 0);
  const allHitCeiling = repsCompleted.every(r => r >= maxPrescribedReps);
  const firstSetHitCeiling = repsCompleted[0] >= maxPrescribedReps;

  let weightIncrement = 2.5;
  if (exercise.type === "dumbbell") weightIncrement = 2.0;
  else if (exercise.type === "cable" || exercise.type === "machine") weightIncrement = 1.25;

  const percentInc = maxWeight > 0 ? ((weightIncrement / maxWeight) * 100).toFixed(1) : 0;

  if (allHitCeiling) {
    const nextWeight = +(maxWeight + weightIncrement).toFixed(1);
    return {
      status: "increase",
      suggestedWeight: nextWeight,
      lastWeight: maxWeight,
      increment: weightIncrement,
      percent: percentInc,
      message: `🚀 DOUBLE PROGRESSION UNLOCKED! You achieved ${maxPrescribedReps} reps across all sets (${maxWeight}kg). Bump weight by +${weightIncrement}kg (+${percentInc}%) to ${nextWeight}kg!`
    };
  }

  if (exercise.isTopSetProtocol && firstSetHitCeiling) {
    const nextTopSet = +(maxWeight + 2.5).toFixed(1);
    return {
      status: "increase",
      suggestedWeight: nextTopSet,
      lastWeight: maxWeight,
      increment: 2.5,
      percent: ((2.5 / maxWeight) * 100).toFixed(1),
      message: `🔥 TOP SET CRUSHED! Top set hit ${repsCompleted[0]} reps @ ${maxWeight}kg. Increase Top Set to ${nextTopSet}kg (+${((2.5 / maxWeight) * 100).toFixed(1)}%) next workout!`
    };
  }

  const allAboveMin = repsCompleted.every(r => r >= minPrescribedReps);
  if (allAboveMin) {
    const lowestRepSetIdx = repsCompleted.indexOf(Math.min(...repsCompleted));
    const targetSetNum = lowestRepSetIdx + 1;
    return {
      status: "hold_push_reps",
      suggestedWeight: maxWeight,
      lastWeight: maxWeight,
      message: `💪 HOLD ${maxWeight}kg! Double Progression: push Set ${targetSetNum} from ${repsCompleted[lowestRepSetIdx]} &rarr; ${repsCompleted[lowestRepSetIdx] + 1} reps. Hit ${maxPrescribedReps} reps on all sets before jumping weight.`
    };
  }

  return {
    status: "maintain_or_recover",
    suggestedWeight: maxWeight,
    lastWeight: maxWeight,
    message: `🛡️ HOLD ${maxWeight}kg. Keep 1-2 RIR and focus on deep eccentric stretch.`
  };
}

function getExerciseHistory(exerciseId) {
  const allSessions = getStoredSessions();
  const history = [];
  const dates = Object.keys(allSessions).sort();
  dates.forEach(date => {
    const session = allSessions[date];
    if (session.exercises && session.exercises[exerciseId]) {
      history.push({
        date: date,
        day: session.day,
        week: session.week,
        sets: session.exercises[exerciseId]
      });
    }
  });
  return history;
}

// ==========================================
// 6. UI RENDERING & 14-DAY LOGIC
// ==========================================
function initApp() {
  const settings = getStoredSettings();
  appState.currentDay = settings.currentDay || 1;
  appState.currentWeek = appState.currentDay <= 7 ? "A" : "B";

  const dateInput = document.getElementById("workoutDateInput");
  if (dateInput) {
    dateInput.value = appState.selectedDate;
    dateInput.addEventListener("change", (e) => {
      appState.selectedDate = e.target.value;
      loadWorkoutForDate(appState.selectedDate);
    });
  }

  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  populateDaySelectDropdown();
  updateWeekToggleUI();
  loadWorkoutForDate(appState.selectedDate);

  renderRoadmapGrid();
  populateInspectorDropdown();
  renderPRBoard();
  loadQuickNutrition();

  registerPWA();
}

function populateDaySelectDropdown() {
  const select = document.getElementById("daySelect");
  if (!select) return;
  select.innerHTML = "";

  for (let d = 1; d <= 14; d++) {
    const dayData = PROGRAM_SPLIT.days[d];
    const opt = document.createElement("option");
    opt.value = d;
    const weekLabel = d <= 7 ? "Week A" : "Week B";
    opt.textContent = `Day ${d} (${weekLabel}): ${dayData.title}`;
    select.appendChild(opt);
  }
}

function registerPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    appState.deferredPrompt = e;
    const directBtn = document.getElementById('installPromptDirect');
    if (directBtn) directBtn.style.display = 'block';
  });
}

function triggerAppInstall() {
  if (appState.deferredPrompt) {
    executeNativeInstall();
  } else {
    openInstallGuideModal();
  }
}

function executeNativeInstall() {
  if (appState.deferredPrompt) {
    appState.deferredPrompt.prompt();
    appState.deferredPrompt.userChoice.then(() => {
      appState.deferredPrompt = null;
      closeInstallGuideModal();
    });
  }
}

function openInstallGuideModal() {
  const modal = document.getElementById('installGuideModal');
  if (modal) modal.style.display = 'flex';
}

function closeInstallGuideModal() {
  const modal = document.getElementById('installGuideModal');
  if (modal) modal.style.display = 'none';
}

function openQRConnectModal() {
  const modal = document.getElementById('qrConnectModal');
  if (!modal) return;
  modal.style.display = 'flex';

  // Check if live public tunnel URL is available from mobile_server.py
  let targetUrl = window.PUBLIC_TUNNEL_URL || window.location.href;
  if (targetUrl.startsWith('file://')) {
    targetUrl = "http://192.168.1.15:8080";
  }

  const input = document.getElementById('manualUrlInput');
  if (input) input.value = targetUrl;

  const canvas = document.getElementById('qrCanvas');
  if (canvas && window.renderQRToCanvas) {
    window.renderQRToCanvas(canvas, targetUrl);
  }
}

function closeQRConnectModal() {
  const modal = document.getElementById('qrConnectModal');
  if (modal) modal.style.display = 'none';
}

function switchTab(tabName) {
  triggerHaptic(20);
  appState.currentTab = tabName;
  document.querySelectorAll(".tab-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === tabName);
  });
  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.toggle("active", content.id === `view-${tabName}`);
  });

  if (tabName === "roadmap") {
    renderRoadmapGrid();
  } else if (tabName === "analytics") {
    populateInspectorDropdown();
    renderPRBoard();
  } else if (tabName === "history") {
    renderHistoryList();
  }
}

function setWeekCycle(weekLetter) {
  triggerHaptic(25);
  appState.currentWeek = weekLetter;
  // Jump to Day 1 for Week A or Day 8 for Week B if out of sync
  if (weekLetter === "A" && appState.currentDay > 7) {
    appState.currentDay = 1;
  } else if (weekLetter === "B" && appState.currentDay <= 7) {
    appState.currentDay = 8;
  }

  saveStoredSettings({ currentDay: appState.currentDay, currentWeek: appState.currentWeek });
  updateWeekToggleUI();
  renderExercisesForCurrentDay();
}

function updateWeekToggleUI() {
  const btnA = document.getElementById("btnWeekA");
  const btnB = document.getElementById("btnWeekB");
  const isWeekA = appState.currentDay <= 7;
  if (btnA && btnB) {
    btnA.classList.toggle("active", isWeekA);
    btnB.classList.toggle("active", !isWeekA);
  }
}

function changeDay(dayNumber) {
  triggerHaptic(20);
  appState.currentDay = parseInt(dayNumber, 10);
  appState.currentWeek = appState.currentDay <= 7 ? "A" : "B";
  saveStoredSettings({ currentDay: appState.currentDay, currentWeek: appState.currentWeek });
  updateWeekToggleUI();
  renderExercisesForCurrentDay();
}

function loadWorkoutForDate(dateStr) {
  const allSessions = getStoredSessions();
  const session = allSessions[dateStr];

  if (session) {
    appState.currentDay = session.day || 1;
    appState.currentWeek = appState.currentDay <= 7 ? "A" : "B";
    updateWeekToggleUI();
    document.getElementById("daySelect").value = appState.currentDay;

    const warmCheck = document.getElementById("warmupDoneCheck");
    if (warmCheck) warmCheck.checked = !!session.warmupDone;

    const notesInput = document.getElementById("sessionNotesInput");
    if (notesInput) notesInput.value = session.notes || "";

    const recNotes = document.getElementById("recoveryNotesInput");
    if (recNotes) recNotes.value = session.recoveryNotes || "";
  } else {
    const warmCheck = document.getElementById("warmupDoneCheck");
    if (warmCheck) warmCheck.checked = false;
    const notesInput = document.getElementById("sessionNotesInput");
    if (notesInput) notesInput.value = "";
    const recNotes = document.getElementById("recoveryNotesInput");
    if (recNotes) recNotes.value = "";
  }

  renderExercisesForCurrentDay();
}

// Parse YouTube Short / Video URL to embed URL
function parseYouTubeEmbedUrl(url) {
  if (!url) return null;
  url = url.trim();
  // Handle shorts format: youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  // Handle youtu.be/VIDEO_ID
  const youtudeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtudeMatch) {
    return `https://www.youtube.com/embed/${youtudeMatch[1]}`;
  }
  // Handle watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  // If already embed
  if (url.includes('/embed/')) return url;
  return null;
}

function renderExercisesForCurrentDay() {
  const dayData = PROGRAM_SPLIT.days[appState.currentDay];
  if (!dayData) return;

  const weekTag = appState.currentDay <= 7 ? "WEEK A" : "WEEK B";
  document.getElementById("currentDayBadge").textContent = `DAY ${appState.currentDay} (${weekTag})`;
  document.getElementById("currentDayTitle").textContent = dayData.title;
  document.getElementById("daySelect").value = appState.currentDay;

  const exercisesContainer = document.getElementById("exercisesContainer");
  const restContainer = document.getElementById("restDayContainer");
  const footerCard = document.querySelector(".session-footer-card");

  if (dayData.type === "recovery" || dayData.type === "rest") {
    exercisesContainer.style.display = "none";
    footerCard.style.display = "none";
    restContainer.style.display = "block";

    document.getElementById("restDayTitle").textContent = `Day ${appState.currentDay}: ${dayData.title}`;
    let html = `<p class="rest-lead" style="font-family:'Kalam'; font-size:22px; color:#1e293b;">${dayData.description}</p><ul class="recovery-check-list" style="list-style:none; padding:0; text-align:left; max-width:600px; margin:20px auto;">`;
    dayData.checklist.forEach((item, idx) => {
      html += `
        <li style="margin-bottom:12px; display:flex; align-items:center; gap:10px;">
          <input type="checkbox" id="rec_chk_${idx}" class="handwritten-chk" style="width:24px; height:24px;">
          <label for="rec_chk_${idx}" style="font-size:19px; font-family:'Patrick Hand';">${item}</label>
        </li>
      `;
    });
    html += `</ul>`;
    document.getElementById("restDayInstructions").innerHTML = html;
    return;
  }

  exercisesContainer.style.display = "flex";
  footerCard.style.display = "block";
  restContainer.style.display = "none";

  const allSessions = getStoredSessions();
  const currentSession = allSessions[appState.selectedDate] || {};
  const loggedExercises = currentSession.exercises || {};
  const crossedMap = getCrossedExercises(appState.selectedDate);
  const storedVideos = getStoredVideos();

  exercisesContainer.innerHTML = "";

  dayData.exercises.forEach((exercise, exIndex) => {
    const history = getExerciseHistory(exercise.id);
    const overloadRec = calculateOverloadRecommendation(exercise, history);
    const isCrossed = !!crossedMap[exercise.id];

    // Check saved video URL or program video
    const videoUrl = storedVideos[exercise.id] || exercise.videoUrl || "";
    const embedUrl = parseYouTubeEmbedUrl(videoUrl);

    const card = document.createElement("div");
    card.className = `exercise-card ${isCrossed ? 'is-crossed' : ''}`;
    card.id = `card_${exercise.id}`;

    // Exercise Card Header
    let headerHTML = `
      <div class="exercise-card-header">
        <div class="ex-title-group">
          <span class="ex-index">${exIndex + 1}</span>
          <span class="ex-name">${exercise.name}</span>
          <span class="crossed-stamp">CROSSED OFF ✓</span>
          <span class="ex-badge">${exercise.sets} sets &bull; ${exercise.minReps}-${exercise.maxReps} reps</span>
        </div>
        <div class="ex-header-actions">
          <button class="scribble-toggle-btn" onclick="toggleExerciseCrossed('${exercise.id}')" title="Cross out like a notebook">
            ✏️ ${isCrossed ? 'Uncross' : 'Scribble Done'}
          </button>
          <button class="rest-timer-btn" onclick="startRestTimer(${exercise.restSec}, '${exercise.name}')">
            ⏱️ ${exercise.restLabel} Rest
          </button>
        </div>
      </div>
      <div class="ex-target-prescription">
        <strong>Execution Cue:</strong> ${exercise.notes}
      </div>
    `;

    // Overload Recommendation Callout
    let overloadHTML = "";
    if (overloadRec.suggestedWeight !== null) {
      overloadHTML = `
        <div class="overload-callout">
          <div class="coach-tip">
            <strong>💡 Coach Overload:</strong> ${overloadRec.message}
          </div>
          <button class="overload-apply-btn" onclick="applyRecommendedWeight('${exercise.id}', ${overloadRec.suggestedWeight})">
            ⚡ Apply ${overloadRec.suggestedWeight}kg
          </button>
        </div>
      `;
    } else {
      overloadHTML = `
        <div class="overload-callout">
          <div class="coach-tip">
            <strong>💡 Coach Cue:</strong> ${overloadRec.message}
          </div>
        </div>
      `;
    }

    // Reserved YouTube Shorts Video Slot
    let videoSlotHTML = `
      <div class="exercise-video-slot" id="vslot_${exercise.id}">
        <div class="video-slot-header" onclick="toggleVideoSlot('${exercise.id}')">
          <span>🎬 Technique Video (YouTube Short): ${embedUrl ? 'Ready to Watch ▶' : 'Tap to Add / Watch Short'}</span>
          <span class="video-slot-toggle-icon">▼</span>
        </div>
        <div class="video-slot-content" id="vcontent_${exercise.id}" style="display:none;">
          ${embedUrl ? `
            <div class="video-player-container">
              <iframe src="${embedUrl}" title="${exercise.name}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          ` : `
            <div style="padding:16px; color:#64748b; font-style:italic; font-family:'Patrick Hand'; font-size:18px;">
              No video added yet. Paste a YouTube Shorts link below anytime:
            </div>
          `}
          <div class="video-edit-bar">
            <input type="text" class="handwritten-input video-link-input" id="vinput_${exercise.id}" 
              placeholder="Paste YouTube Short URL (e.g. https://youtube.com/shorts/...)" 
              value="${videoUrl}">
            <button class="sketch-btn micro primary" onclick="updateExerciseVideo('${exercise.id}')">💾 Save Video</button>
          </div>
        </div>
      </div>
    `;

    // Sets Table
    const existingSets = loggedExercises[exercise.id] || [];
    let setsTableHTML = `
      <div class="sets-table-wrap">
        <table class="sets-table">
          <thead>
            <tr>
              <th style="width: 58px;">SET</th>
              <th style="width: 85px;">PREV</th>
              <th style="width: 175px;">WEIGHT (KG)</th>
              <th style="width: 130px;">REPS</th>
              <th>CUES / RPE</th>
              <th style="width: 50px; text-align:center;">DONE</th>
            </tr>
          </thead>
          <tbody>
    `;

    const lastSessionSets = history.length > 0 ? history[history.length - 1].sets : [];

    for (let s = 0; s < exercise.sets; s++) {
      const setNumber = s + 1;
      const isTopSet = exercise.isTopSetProtocol && s === 0;
      const isBackOff = exercise.isTopSetProtocol && s > 0;

      const currentSetData = existingSets[s] || {
        weight: "",
        reps: "",
        notes: "",
        done: false
      };

      const prevSet = lastSessionSets && lastSessionSets[s] ? `${lastSessionSets[s].weight}k×${lastSessionSets[s].reps}` : "—";

      setsTableHTML += `
        <tr class="set-row ${currentSetData.done ? 'is-done' : ''}" id="row_${exercise.id}_${s}">
          <td class="set-tag-cell">
            <span class="set-tag-badge">#${setNumber}</span>
            ${isTopSet ? '<span class="top-set-badge">TOP</span>' : ''}
            ${isBackOff ? '<span class="set-tag-badge" style="background:#475569; font-size:9px;">OFF</span>' : ''}
          </td>
          <td class="prev-log-cell">${prevSet}</td>
          <td>
            <div class="stepper-input-wrap">
              <button type="button" class="quick-btn" onclick="adjustWeight('${exercise.id}', ${s}, -2.5)">-2.5</button>
              <input type="number" step="0.5" class="step-input" id="weight_${exercise.id}_${s}" 
                value="${currentSetData.weight}" placeholder="0" 
                oninput="onSetInputChange('${exercise.id}', ${s})">
              <button type="button" class="quick-btn" onclick="adjustWeight('${exercise.id}', ${s}, 2.5)">+2.5</button>
              <button type="button" class="quick-btn" onclick="adjustWeight('${exercise.id}', ${s}, 5)">+5</button>
            </div>
          </td>
          <td>
            <div class="stepper-input-wrap">
              <button type="button" class="quick-btn" onclick="adjustReps('${exercise.id}', ${s}, -1)">-</button>
              <input type="number" class="step-input reps-input" id="reps_${exercise.id}_${s}" 
                value="${currentSetData.reps}" placeholder="${exercise.minReps}" 
                oninput="onSetInputChange('${exercise.id}', ${s})">
              <button type="button" class="quick-btn" onclick="adjustReps('${exercise.id}', ${s}, 1)">+</button>
            </div>
          </td>
          <td class="notes-input-cell">
            <input type="text" class="handwritten-input" id="notes_${exercise.id}_${s}" 
              value="${currentSetData.notes || ''}" placeholder="${isTopSet ? '@ RPE 8.5' : 'Clean'}" 
              oninput="onSetInputChange('${exercise.id}', ${s})">
          </td>
          <td style="text-align: center;">
            <label class="custom-checkbox">
              <input type="checkbox" id="done_${exercise.id}_${s}" 
                ${currentSetData.done ? 'checked' : ''} 
                onchange="toggleSetDone('${exercise.id}', ${s}, this.checked)">
              <span class="checkbox-box"></span>
            </label>
          </td>
        </tr>
      `;
    }

    setsTableHTML += `
          </tbody>
        </table>
      </div>
    `;

    card.innerHTML = headerHTML + overloadHTML + videoSlotHTML + setsTableHTML;
    exercisesContainer.appendChild(card);
  });

  updateSessionSummary();
}

// ==========================================
// 7. SCRIBBLE CROSS-OUT & VIDEO ACTIONS
// ==========================================
function toggleExerciseCrossed(exerciseId) {
  const card = document.getElementById(`card_${exerciseId}`);
  if (!card) return;

  const isCrossedNow = !card.classList.contains("is-crossed");
  card.classList.toggle("is-crossed", isCrossedNow);

  if (isCrossedNow) {
    playScribbleSound();
  }

  // Update button label
  const btn = card.querySelector(".scribble-toggle-btn");
  if (btn) btn.innerHTML = isCrossedNow ? "✏️ Uncross" : "✏️ Scribble Done";

  setCrossedExercise(appState.selectedDate, exerciseId, isCrossedNow);
}

function toggleVideoSlot(exerciseId) {
  const slot = document.getElementById(`vslot_${exerciseId}`);
  const content = document.getElementById(`vcontent_${exerciseId}`);
  if (!slot || !content) return;

  const isVisible = content.style.display !== "none";
  content.style.display = isVisible ? "none" : "block";
  slot.classList.toggle("open", !isVisible);
}

function updateExerciseVideo(exerciseId) {
  const input = document.getElementById(`vinput_${exerciseId}`);
  if (!input) return;
  const url = input.value.trim();
  saveStoredVideo(exerciseId, url);
  alert("🎬 YouTube Short link saved! Re-rendering video...");
  renderExercisesForCurrentDay();
}

// ==========================================
// 8. SET ACTIONS & QUICK BUTTONS
// ==========================================
function adjustWeight(exerciseId, setIndex, delta) {
  triggerHaptic(20);
  const input = document.getElementById(`weight_${exerciseId}_${setIndex}`);
  if (!input) return;
  let val = parseFloat(input.value) || 0;
  val = Math.max(0, +(val + delta).toFixed(1));
  input.value = val;
  onSetInputChange(exerciseId, setIndex);
}

function adjustReps(exerciseId, setIndex, delta) {
  triggerHaptic(20);
  const input = document.getElementById(`reps_${exerciseId}_${setIndex}`);
  if (!input) return;
  let val = parseInt(input.value, 10) || 0;
  val = Math.max(0, val + delta);
  input.value = val;
  onSetInputChange(exerciseId, setIndex);
}

function applyRecommendedWeight(exerciseId, weight) {
  triggerHaptic(40);
  const dayData = PROGRAM_SPLIT.days[appState.currentDay];
  const ex = dayData.exercises.find(e => e.id === exerciseId);
  if (!ex) return;

  for (let s = 0; s < ex.sets; s++) {
    const input = document.getElementById(`weight_${exerciseId}_${s}`);
    if (input) {
      if (ex.isTopSetProtocol && s > 0) {
        input.value = +(weight * 0.9).toFixed(1);
      } else {
        input.value = weight;
      }
      onSetInputChange(exerciseId, s);
    }
  }
  playPenClickSound();
}

function toggleSetDone(exerciseId, setIndex, isDone) {
  const row = document.getElementById(`row_${exerciseId}_${setIndex}`);
  if (row) {
    row.classList.toggle("is-done", isDone);
  }
  if (isDone) {
    playPenClickSound();
  }

  // Check if all sets for this exercise are now completed -> auto-cross with notebook scribble!
  const dayData = PROGRAM_SPLIT.days[appState.currentDay];
  const ex = dayData.exercises.find(e => e.id === exerciseId);
  if (ex) {
    let allDone = true;
    for (let s = 0; s < ex.sets; s++) {
      const chk = document.getElementById(`done_${exerciseId}_${s}`);
      if (!chk || !chk.checked) {
        allDone = false;
        break;
      }
    }
    const card = document.getElementById(`card_${exerciseId}`);
    if (card) {
      if (allDone && !card.classList.contains("is-crossed")) {
        card.classList.add("is-crossed");
        playScribbleSound();
        setCrossedExercise(appState.selectedDate, exerciseId, true);
        const btn = card.querySelector(".scribble-toggle-btn");
        if (btn) btn.innerHTML = "✏️ Uncross";
      } else if (!allDone && card.classList.contains("is-crossed")) {
        card.classList.remove("is-crossed");
        setCrossedExercise(appState.selectedDate, exerciseId, false);
        const btn = card.querySelector(".scribble-toggle-btn");
        if (btn) btn.innerHTML = "✏️ Scribble Done";
      }
    }
  }

  saveCurrentSession(false);
  updateSessionSummary();
}

function onSetInputChange(exerciseId, setIndex) {
  saveCurrentSession(false);
  updateSessionSummary();
}

function toggleWarmupDone(isDone) {
  if (isDone) playPenClickSound();
  saveCurrentSession(false);
}

function loadPreviousWeights() {
  const dayData = PROGRAM_SPLIT.days[appState.currentDay];
  if (!dayData || !dayData.exercises) return;

  let filledCount = 0;
  dayData.exercises.forEach(exercise => {
    const history = getExerciseHistory(exercise.id);
    if (history.length > 0) {
      const lastSession = history[history.length - 1];
      if (lastSession.sets) {
        lastSession.sets.forEach((prevSet, s) => {
          const weightInput = document.getElementById(`weight_${exercise.id}_${s}`);
          const repsInput = document.getElementById(`reps_${exercise.id}_${s}`);
          if (weightInput && !weightInput.value && prevSet.weight) {
            weightInput.value = prevSet.weight;
            filledCount++;
          }
          if (repsInput && !repsInput.value && prevSet.reps) {
            repsInput.value = prevSet.reps;
          }
        });
      }
    }
  });

  if (filledCount > 0) {
    playPenClickSound();
    saveCurrentSession(false);
    alert(`⚡ Pre-filled ${filledCount} weights from your previous recorded session!`);
  } else {
    alert("No previous logs found for this day's exercises yet.");
  }
}

// ==========================================
// 9. SAVE & STORAGE WORKFLOW
// ==========================================
function saveCurrentSession(showToast = false) {
  const allSessions = getStoredSessions();
  const dayData = PROGRAM_SPLIT.days[appState.currentDay];
  const dateStr = appState.selectedDate;

  const currentSession = {
    date: dateStr,
    day: appState.currentDay,
    week: appState.currentDay <= 7 ? "A" : "B",
    warmupDone: document.getElementById("warmupDoneCheck") ? document.getElementById("warmupDoneCheck").checked : false,
    notes: document.getElementById("sessionNotesInput") ? document.getElementById("sessionNotesInput").value : "",
    recoveryNotes: document.getElementById("recoveryNotesInput") ? document.getElementById("recoveryNotesInput").value : "",
    exercises: {},
    savedAt: new Date().toISOString()
  };

  if (dayData && dayData.exercises) {
    dayData.exercises.forEach(exercise => {
      const setsArr = [];
      for (let s = 0; s < exercise.sets; s++) {
        const weightInput = document.getElementById(`weight_${exercise.id}_${s}`);
        const repsInput = document.getElementById(`reps_${exercise.id}_${s}`);
        const notesInput = document.getElementById(`notes_${exercise.id}_${s}`);
        const doneInput = document.getElementById(`done_${exercise.id}_${s}`);

        setsArr.push({
          setNumber: s + 1,
          weight: weightInput ? parseFloat(weightInput.value) || 0 : 0,
          reps: repsInput ? parseInt(repsInput.value, 10) || 0 : 0,
          notes: notesInput ? notesInput.value : "",
          done: doneInput ? doneInput.checked : false
        });
      }
      currentSession.exercises[exercise.id] = setsArr;
    });
  }

  allSessions[dateStr] = currentSession;
  saveStoredSessions(allSessions);

  if (showToast) {
    playChimeSound();
    alert(`🎉 Workout for ${dateStr} (Day ${appState.currentDay} - Week ${currentSession.week}) saved to ink!`);
    renderRoadmapGrid();
    renderPRBoard();
  }
}

function updateSessionSummary() {
  const dayData = PROGRAM_SPLIT.days[appState.currentDay];
  if (!dayData || !dayData.exercises) return;

  let totalSetsPrescribed = 0;
  let totalSetsDone = 0;
  let totalVolume = 0;

  dayData.exercises.forEach(exercise => {
    totalSetsPrescribed += exercise.sets;
    for (let s = 0; s < exercise.sets; s++) {
      const weightInput = document.getElementById(`weight_${exercise.id}_${s}`);
      const repsInput = document.getElementById(`reps_${exercise.id}_${s}`);
      const doneInput = document.getElementById(`done_${exercise.id}_${s}`);

      if (doneInput && doneInput.checked) {
        totalSetsDone++;
        const w = parseFloat(weightInput.value) || 0;
        const r = parseInt(repsInput.value, 10) || 0;
        totalVolume += w * r;
      }
    }
  });

  const setsElem = document.getElementById("summarySetsFinished");
  if (setsElem) setsElem.textContent = `${totalSetsDone} / ${totalSetsPrescribed}`;

  const volElem = document.getElementById("summaryTotalVolume");
  if (volElem) volElem.textContent = `${totalVolume.toLocaleString()} kg`;

  const statusElem = document.getElementById("summarySessionStatus");
  if (statusElem) {
    if (totalSetsDone === totalSetsPrescribed && totalSetsPrescribed > 0) {
      statusElem.textContent = "✅ Completed!";
      statusElem.style.color = "#16a34a";
    } else if (totalSetsDone > 0) {
      statusElem.textContent = "⚡ In Progress";
      statusElem.style.color = "#d97706";
    } else {
      statusElem.textContent = "⏳ Not Started";
      statusElem.style.color = "#64748b";
    }
  }
}

// ==========================================
// 10. REST STOPWATCH TIMER
// ==========================================
function startRestTimer(seconds, label = "Rest Timer") {
  triggerHaptic(30);
  clearInterval(appState.timerInterval);
  appState.timerSecondsRemaining = seconds;
  appState.timerIsPaused = false;

  const timerWidget = document.getElementById("floatingTimerWidget");
  const timerLabel = document.getElementById("timerLabel");
  const timerToggleBtn = document.getElementById("timerToggleBtn");

  if (timerWidget) timerWidget.style.display = "block";
  if (timerLabel) timerLabel.textContent = label;
  if (timerToggleBtn) timerToggleBtn.textContent = "⏸ Pause";

  updateTimerDisplay();

  appState.timerInterval = setInterval(() => {
    if (!appState.timerIsPaused) {
      appState.timerSecondsRemaining--;
      updateTimerDisplay();

      if (appState.timerSecondsRemaining <= 0) {
        clearInterval(appState.timerInterval);
        playTimerFinishedAlarm();
        if (timerLabel) timerLabel.textContent = "TIME'S UP! NEXT SET!";
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const clock = document.getElementById("timerDisplay");
  if (!clock) return;
  const mins = Math.floor(Math.max(0, appState.timerSecondsRemaining) / 60);
  const secs = Math.max(0, appState.timerSecondsRemaining) % 60;
  clock.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function toggleTimerPause() {
  triggerHaptic(20);
  appState.timerIsPaused = !appState.timerIsPaused;
  const btn = document.getElementById("timerToggleBtn");
  if (btn) btn.textContent = appState.timerIsPaused ? "▶ Resume" : "⏸ Pause";
}

function adjustTimer(delta) {
  triggerHaptic(20);
  appState.timerSecondsRemaining = Math.max(0, appState.timerSecondsRemaining + delta);
  updateTimerDisplay();
}

function closeRestTimer() {
  clearInterval(appState.timerInterval);
  const timerWidget = document.getElementById("floatingTimerWidget");
  if (timerWidget) timerWidget.style.display = "none";
}

// ==========================================
// 11. ROADMAP (14-DAY BLOCK & 26 WEEKS)
// ==========================================
function renderRoadmapGrid() {
  const container = document.getElementById("weeksGridContainer");
  if (!container) return;
  container.innerHTML = "";

  for (let w = 1; w <= 26; w++) {
    const cycle = (w % 2 === 1) ? "WEEK A" : "WEEK B";
    const card = document.createElement("div");
    card.className = "week-card";

    card.innerHTML = `
      <div class="week-card-head">
        <span>WK ${w}</span>
        <span class="week-cycle-stamp">${cycle}</span>
      </div>
      <div class="week-days-dots">
        <span class="day-dot" title="Day 1"></span>
        <span class="day-dot" title="Day 2"></span>
        <span class="day-dot" title="Day 3"></span>
        <span class="day-dot" title="Day 4"></span>
        <span class="day-dot" title="Day 5"></span>
        <span class="day-dot" title="Day 6"></span>
        <span class="day-dot" title="Day 7"></span>
      </div>
    `;

    card.addEventListener("click", () => {
      setWeekCycle((w % 2 === 1) ? "A" : "B");
      switchTab("logger");
      alert(`Switched to Week ${w} (${cycle})!`);
    });

    container.appendChild(card);
  }
}

// ==========================================
// 12. PR BOARD & OVERLOAD INSPECTOR
// ==========================================
function getAllExercisesFlat() {
  const exercises = [];
  const addedIds = new Set();
  Object.keys(PROGRAM_SPLIT.days).forEach(dayNum => {
    const day = PROGRAM_SPLIT.days[dayNum];
    if (day.exercises) {
      day.exercises.forEach(ex => {
        if (!addedIds.has(ex.id)) {
          addedIds.add(ex.id);
          exercises.push({
            ...ex,
            dayNumber: dayNum,
            dayTitle: day.title
          });
        }
      });
    }
  });
  return exercises;
}

function populateInspectorDropdown() {
  const select = document.getElementById("inspectorExerciseSelect");
  if (!select) return;
  select.innerHTML = "";

  const allEx = getAllExercisesFlat();
  allEx.forEach(ex => {
    const opt = document.createElement("option");
    opt.value = ex.id;
    opt.textContent = `Day ${ex.dayNumber}: ${ex.name}`;
    select.appendChild(opt);
  });

  if (allEx.length > 0) {
    renderExerciseProgressionDetail(allEx[0].id);
  }
}

function renderExerciseProgressionDetail(exerciseId) {
  const container = document.getElementById("inspectorDetailCard");
  if (!container) return;

  const allEx = getAllExercisesFlat();
  const exercise = allEx.find(e => e.id === exerciseId);
  if (!exercise) return;

  const history = getExerciseHistory(exerciseId);
  const overloadRec = calculateOverloadRecommendation(exercise, history);

  let historyHTML = "";
  if (history.length === 0) {
    historyHTML = `<p style="color:#64748b; font-style:italic;">No logged sessions yet for this lift. Complete your first workout to generate progress charts!</p>`;
  } else {
    historyHTML = `
      <table class="sets-table" style="margin-top:12px;">
        <thead>
          <tr>
            <th>DATE</th>
            <th>CYCLE</th>
            <th>LOGGED SETS (WEIGHT × REPS)</th>
            <th>MAX LOAD</th>
          </tr>
        </thead>
        <tbody>
    `;

    history.slice().reverse().forEach(entry => {
      const setStrings = entry.sets.filter(s => s.done).map(s => `${s.weight}kg × ${s.reps}`).join(" | ") || "Incomplete";
      const maxW = Math.max(...entry.sets.map(s => s.weight || 0));
      historyHTML += `
        <tr>
          <td><strong>${entry.date}</strong></td>
          <td>Week ${entry.week}</td>
          <td>${setStrings}</td>
          <td><span style="font-family:'Space Mono'; font-weight:bold; color:#b91c1c;">${maxW} kg</span></td>
        </tr>
      `;
    });

    historyHTML += `</tbody></table>`;
  }

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
      <div>
        <h3 style="font-family:'Kalam'; font-size:1.4rem; color:#111;">${exercise.name}</h3>
        <p style="font-size:16px; color:#475569;">${exercise.dayTitle} &bull; Target: ${exercise.sets} sets × ${exercise.minReps}-${exercise.maxReps} reps &bull; Rest: ${exercise.restLabel}</p>
      </div>
      <div class="sticky-note yellow" style="transform:none;">
        <div class="sticky-title">NEXT RECOM. LOAD</div>
        <div style="font-family:'Space Mono'; font-size:22px; font-weight:bold; text-align:center; color:#b91c1c;">
          ${overloadRec.suggestedWeight ? overloadRec.suggestedWeight + ' kg' : 'Baseline'}
        </div>
      </div>
    </div>
    <div class="overload-callout" style="margin-bottom:16px;">
      <div class="coach-tip">${overloadRec.message}</div>
    </div>
    <h4 style="font-family:'Permanent Marker'; font-size:16px; margin-top:16px;">LOGGED SESSION HISTORY:</h4>
    ${historyHTML}
  `;
}

function renderPRBoard() {
  const container = document.getElementById("prBoardGrid");
  if (!container) return;
  container.innerHTML = "";

  const allEx = getAllExercisesFlat();
  allEx.forEach(ex => {
    let maxWeight = 0;
    let bestReps = 0;
    let bestDate = "";

    const history = getExerciseHistory(ex.id);
    history.forEach(session => {
      session.sets.forEach(s => {
        if (s.done && s.weight > maxWeight) {
          maxWeight = s.weight;
          bestReps = s.reps;
          bestDate = session.date;
        }
      });
    });

    const card = document.createElement("div");
    card.className = "pr-card";
    card.innerHTML = `
      <span class="star-icon">⭐</span>
      <div class="pr-card-title">${ex.name}</div>
      <div class="pr-card-value">${maxWeight > 0 ? maxWeight + ' kg' : '—'}</div>
      <div class="pr-card-sub">
        ${maxWeight > 0 ? `Best: ${bestReps} reps on ${bestDate}` : 'No PR logged yet'}
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================
// 13. HISTORY VIEWER
// ==========================================
function renderHistoryList(filterQuery = "") {
  const container = document.getElementById("historyListContainer");
  if (!container) return;
  container.innerHTML = "";

  const allSessions = getStoredSessions();
  const dates = Object.keys(allSessions).sort().reverse();

  if (dates.length === 0) {
    container.innerHTML = `<p style="color:#64748b; font-style:italic;">No workouts saved yet. Record today's workout on the first tab!</p>`;
    return;
  }

  dates.forEach(date => {
    const session = allSessions[date];
    const dayData = PROGRAM_SPLIT.days[session.day] || {};

    const card = document.createElement("div");
    card.className = "history-card";

    let exRowsHTML = "";
    if (session.exercises) {
      Object.keys(session.exercises).forEach(exId => {
        const sets = session.exercises[exId] || [];
        const completedSets = sets.filter(s => s.done);
        if (completedSets.length > 0) {
          const setsSummary = completedSets.map(s => `${s.weight}kg × ${s.reps}`).join(", ");
          const allEx = getAllExercisesFlat();
          const exMeta = allEx.find(e => e.id === exId);
          const name = exMeta ? exMeta.name : exId;

          exRowsHTML += `
            <div class="history-exercise-row">
              <strong>${name}:</strong>
              <span>${setsSummary}</span>
            </div>
          `;
        }
      });
    }

    card.innerHTML = `
      <div class="history-card-header">
        <div>
          <span class="history-date">📅 ${date}</span>
          <span style="font-family:'Patrick Hand'; font-size:16px; margin-left:8px; color:#1e3a8a;">
            Day ${session.day}: ${dayData.title || ''} (Week ${session.week || 'A'})
          </span>
        </div>
        <button class="sketch-btn micro" onclick="openDateInLogger('${date}')">✏️ Edit</button>
      </div>
      <div>${exRowsHTML || '<p style="color:#64748b; font-size:14px;">No completed sets recorded.</p>'}</div>
      ${session.notes ? `<div style="margin-top:8px; font-size:15px; color:#475569;"><em>Note: "${session.notes}"</em></div>` : ''}
    `;

    container.appendChild(card);
  });
}

function openDateInLogger(date) {
  appState.selectedDate = date;
  document.getElementById("workoutDateInput").value = date;
  loadWorkoutForDate(date);
  switchTab("logger");
}

function filterHistoryLogs() {
  const query = document.getElementById("historySearchInput").value.toLowerCase();
  renderHistoryList(query);
}

function clearAllHistoryPrompt() {
  if (confirm("⚠️ Clear workout history? Export a backup first so you don't lose data!")) {
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.CROSSED);
    renderHistoryList();
    renderPRBoard();
    alert("Workout history cleared.");
  }
}

// ==========================================
// 14. BACKUP & EXPORT
// ==========================================
function exportDataBackup() {
  const data = {
    sessions: getStoredSessions(),
    settings: getStoredSettings(),
    videos: getStoredVideos(),
    crossed: localStorage.getItem(STORAGE_KEYS.CROSSED),
    nutrition: localStorage.getItem(STORAGE_KEYS.NUTRITION),
    exportedAt: new Date().toISOString(),
    program: "14-Day A/B Rotating Hypertrophy, Core & Vitality Program"
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `wimpy_workout_backup_${appState.selectedDate}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importDataBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.sessions) saveStoredSessions(parsed.sessions);
      if (parsed.settings) saveStoredSettings(parsed.settings);
      if (parsed.videos) localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(parsed.videos));
      if (parsed.crossed) localStorage.setItem(STORAGE_KEYS.CROSSED, parsed.crossed);
      if (parsed.nutrition) localStorage.setItem(STORAGE_KEYS.NUTRITION, parsed.nutrition);
      alert("✅ Data successfully restored from backup file!");
      location.reload();
    } catch (err) {
      alert("Error parsing backup JSON file: " + err.message);
    }
  };
  reader.readAsText(file);
}

// ==========================================
// 15. QUICK NUTRITION LOGGER
// ==========================================
function loadQuickNutrition() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NUTRITION);
    if (!raw) return;
    const data = JSON.parse(raw);
    const todayData = data[appState.selectedDate];
    if (todayData) {
      if (document.getElementById("quickCalorieInput")) document.getElementById("quickCalorieInput").value = todayData.calories || "";
      if (document.getElementById("quickProteinInput")) document.getElementById("quickProteinInput").value = todayData.protein || "";
      if (document.getElementById("quickWeightInput")) document.getElementById("quickWeightInput").value = todayData.weight || "";
    }
  } catch (e) {}
}

function saveQuickNutritionField(field, val) {
  let data = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NUTRITION);
    if (raw) data = JSON.parse(raw);
  } catch (e) {}

  if (!data[appState.selectedDate]) data[appState.selectedDate] = {};
  data[appState.selectedDate][field] = val;
  localStorage.setItem(STORAGE_KEYS.NUTRITION, JSON.stringify(data));
}

function saveQuickCalories(val) { saveQuickNutritionField("calories", val); }
function saveQuickProtein(val) { saveQuickNutritionField("protein", val); }
function saveQuickWeight(val) { saveQuickNutritionField("weight", val); }

// ==========================================
// INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
