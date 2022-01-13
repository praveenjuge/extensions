import { ActionPanel, Detail, Toast } from "@raycast/api";
import { setTimeout } from "timers/promises";

const description = `
# Notifications

In Raycast, users perform actions to create or update content. It's best to confirm these actions
with visual elements. For this, you can show toasts or HUDs.

## Toasts

With toasts, you can notify the user about success, loading or failure states of actions. We use
them for confirming network requests, e.g. updating a Linear issue.

## HUDs

HUDs are perfect to show when you confirm a small action. Showing a HUD closes the main window.
We use them when you copy something to the clipboard, e.g. in the Clipboard History.
`;

export default function Command() {
  return (
    <Detail
      markdown={description}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action
              title="Show Success Toast"
              onAction={() => Toast.show(Toast.Style.Success, "Showed success toast")}
            />
            <Action
              title="Show Failure Toast with Message"
              onAction={() =>
                Toast.show(Toast.Style.Failure, "Showed failure toast", "Message with additional information")
              }
            />
            <AnimatedToast />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action title="Show HUD" onAction={() => Toast.showHUD("Showed HUD")} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

function AnimatedToast() {
  async function showAnimatedToast() {
    const toast = new Toast({ style: ToastStyle.Animated, title: "Updating something" });
    toast.show();

    await setTimeout(1000);

    toast.style = ToastStyle.Success;
    toast.title = "Updated something";
  }

  return <ActionPanel.Item title="Show Animated Toast" onAction={showAnimatedToast} />;
}
