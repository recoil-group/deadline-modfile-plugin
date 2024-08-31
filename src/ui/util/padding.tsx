import React from "@rbxts/react";

export default (paddingNum?: number) => (
	<uipadding
		PaddingBottom={new UDim(0, paddingNum)}
		PaddingLeft={new UDim(0, paddingNum)}
		PaddingRight={new UDim(0, paddingNum)}
		PaddingTop={new UDim(0, paddingNum)}
	/>
);
