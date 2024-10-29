import React from "@rbxts/react";
import padding from "ui/util/padding";
import { RESET_BUTTON } from "ui/util/ui_style";

type props = { text: string; onclick: () => void; layout_order?: number };

export function Button({ onclick, text, layout_order }: props): React.Element {
	return (
		<textbutton
			{...RESET_BUTTON}
			LayoutOrder={layout_order}
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
