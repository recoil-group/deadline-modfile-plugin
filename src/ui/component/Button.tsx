import React from "@rbxts/react";
import padding from "ui/util/padding";
import { RESET_BUTTON } from "ui/util/ui_style";

type props = { text: string; onclick: () => void };

export function Button({ onclick, text }: props): React.Element {
	return (
		<textbutton
			{...RESET_BUTTON}
			Size={new UDim2(1, 0, 0, 0)}
			Text={text}
			Event={{
				MouseEnter: () => {},
				MouseLeave: () => {},
				MouseButton1Down: () => onclick(),
			}}
		>
			{padding(16)}
		</textbutton>
	);
}
