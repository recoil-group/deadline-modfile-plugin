import React from "@rbxts/react";

export const FONT_SIZE = 16;
export const SDK_UI_STYLE = {
	scale: React.createBinding(1),

	font: React.createBinding(Enum.Font.RobotoMono),
	col_accent: React.createBinding(Color3.fromHex("#3b82f6")),

	zinc50: React.createBinding(Color3.fromHex("#fafafa")),
	zinc100: React.createBinding(Color3.fromHex("#f4f4f5")),
	zinc200: React.createBinding(Color3.fromHex("#e4e4e7")),
	zinc300: React.createBinding(Color3.fromHex("#d4d4d8")),
	zinc400: React.createBinding(Color3.fromHex("#a1a1aa")),
	zinc500: React.createBinding(Color3.fromHex("#71717a")),
	zinc600: React.createBinding(Color3.fromHex("#52525b")),
	zinc700: React.createBinding(Color3.fromHex("#3f3f46")),
	zinc800: React.createBinding(Color3.fromHex("#27272a")),
	zinc900: React.createBinding(Color3.fromHex("#18181b")),
};

export const SCROLLING_FRAME_PROPS = {
	TopImage: "rbxasset://textures/ui/Scroll/scroll-middle.png",
	BottomImage: "rbxasset://textures/ui/Scroll/scroll-middle.png",
	BorderSizePixel: 0,
	ScrollBarThickness: 4,
};

export const RESET_FRAME = {
	BorderSizePixel: 0,
};

export const RESET_TEXTLABEL = {
	BackgroundTransparency: 1,
	BorderSizePixel: 0,
	AutomaticSize: "XY" as const,

	TextColor3: SDK_UI_STYLE.zinc200[0],
	Font: SDK_UI_STYLE.font[0],
	TextSize: SDK_UI_STYLE.scale[0].map((scale) => FONT_SIZE * scale),
};

export const RESET_BUTTON = {
	BackgroundTransparency: 0,
	BorderSizePixel: 0,
	BackgroundColor3: SDK_UI_STYLE.zinc800[0],
	AutomaticSize: "XY" as const,
	// AutoButtonColor: false,

	TextColor3: SDK_UI_STYLE.zinc200[0],
	Font: SDK_UI_STYLE.font[0],
	TextSize: SDK_UI_STYLE.scale[0].map((scale) => FONT_SIZE * scale),
};
