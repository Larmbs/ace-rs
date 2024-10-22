// Define the Condition type
type Condition =
  | { type: "Time"; time: number } // Time in game ticks
  | { type: "KeyPress"; keyCode: number }; // Keycode

// Function to check if a condition is true
function conditionIsTrue(condition: Condition): boolean {
    if (condition.type === "Time") {
        condition.time -= 1; // Decrease the time
        return condition.time <= 0; // Return true if time is up
    }
    // For KeyPress, you would implement actual key press detection logic here.
    return false; // Default false if not a Time condition
}

// Enum for event lifetime
enum LifeTime {
    Once,
    Forever,
}

// Class representing a game event
class GameEvent {
    private condition: Condition;
    private action: VoidFunction;
    private lifetime: LifeTime;
    kill: boolean = false;

    constructor(condition: Condition, action: VoidFunction, lifetime: LifeTime = LifeTime.Forever) {
        this.condition = condition;
        this.action = action;
        this.lifetime = lifetime;
    }

    /**
     * Checks if the condition has occurred yet
     */
    update() {
        if (conditionIsTrue(this.condition)) {
            this.action();
            if (this.lifetime === LifeTime.Once) {
                this.kill = true; // Mark for deletion if the lifetime is Once
            }
        }
    }
}

// Class to manage multiple events
class EventChecker {
    private events: GameEvent[] = [];

    // Method to add events
    addEvent(event: GameEvent) {
        this.events.push(event);
    }

    // Method to update all events
    updateEvents() {
        this.events.forEach((event, index) => {
            event.update();
            if (event.kill) {
                this.events.splice(index, 1); // Remove the event if it should be killed
            }
        });
    }
}