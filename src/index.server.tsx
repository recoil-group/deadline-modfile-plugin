import React from "@rbxts/react";
import Roact from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { Plugin } from "ui/Plugin";

const widget_info = new DockWidgetPluginGuiInfo(Enum.InitialDockState.Float, false, false, 520, 375, 520, 375);
const toolbar = plugin.CreateToolbar("DeadlineSDK");
const toggle_Button = toolbar.CreateButton(
	"DeadlineSDK_Toggle",
	"Toggle the plugin UI",
	"rbxassetid://18483258334",
	"Deadline Modding",
);

const widget = plugin.CreateDockWidgetPluginGui("DeadlineSDK", widget_info);
widget.Name = "Deadline Modding";

const handle = ReactRoblox.createRoot(widget);
handle.render(<Plugin plugin={plugin} />);

toggle_Button.Click.Connect(() => {
	widget.Enabled = !widget.Enabled;
});
