import React from "@rbxts/react";
import padding from "./util/padding";
import { RESET_BUTTON, RESET_FRAME, RESET_TEXTLABEL, SDK_UI_STYLE } from "./util/ui_style";
import { Modfile, ModfilePackager } from "@rbxts/dl-modfile-packager";
import { Button } from "./component/Button";

const Selection = game.GetService("Selection");
const ServerScriptService = game.GetService("ServerScriptService");
const Workspace = game.GetService("Workspace");

function unpack_modfile(modfile: Modfile.file) {
	const { class_declarations, instance_declarations, script_declarations, map_declarations } = modfile;
	const folder = new Instance("Folder");
	folder.Name = modfile.info!.name;

	class_declarations.forEach((element) => {
		const class_folder = new Instance("Folder");
		class_folder.Name = element.properties.name;
		class_folder.Parent = folder;

		element.attachments.forEach((attachment_class) => {
			const instance_declaration = instance_declarations.find((value) =>
				value.position.kind === "attachment_root" && value.position.parent_id === attachment_class.instance_id
					? true
					: false,
			);

			if (instance_declaration) instance_declaration.instance.Parent = class_folder;
		});
	});

	map_declarations.forEach((element) => {
		const instance = instance_declarations.find((value) => value.position.instance_id === element.instance_id);
		if (instance) instance.instance.Parent = folder;
	});

	script_declarations.forEach((element) => {
		const scrip = new Instance("Script");
		scrip.Source = element.source;
		scrip.Name = "autorun";
		scrip.Parent = folder;
	});

	folder.Parent = ServerScriptService;
}

type props = {
	plugin: typeof plugin;
};

export function Plugin({ plugin }: props): React.Element {
	const input_ref = React.useRef<TextBox>();
	const [problem, set_problem] = React.useState("");

	return (
		<frame {...RESET_FRAME} Size={new UDim2(1, 0, 1, 0)} BackgroundColor3={SDK_UI_STYLE.zinc900[0].getValue()}>
			<uilistlayout Padding={new UDim(0, 8)} SortOrder={"LayoutOrder"} />
			{padding(16)}

			<textlabel
				{...RESET_TEXTLABEL}
				TextColor3={SDK_UI_STYLE.zinc200[0]}
				Text={`Deadline Modding Tool ${ModfilePackager.PACKAGER_VERSION}`}
				TextXAlignment={"Left"}
				TextSize={24}
				LayoutOrder={1}
			/>

			<textlabel
				{...RESET_TEXTLABEL}
				TextColor3={SDK_UI_STYLE.zinc400[0]}
				TextWrapped={true}
				TextXAlignment={"Left"}
				Text={"Please always make sure this plugin is up to date, or it might not work anymore."}
				TextSize={16}
				LayoutOrder={2}
			/>

			<frame
				Size={new UDim2(1, 0, 0, 1)}
				BackgroundColor3={SDK_UI_STYLE.zinc800[0]}
				BorderSizePixel={0}
				LayoutOrder={3}
			/>

			{/* export */}
			<Button
				text={"export selected instance"}
				onclick={() => {
					const current_selection = Selection.Get();
					const has_mod_marker = Workspace.FindFirstChild("DeadlineTestMod");

					if (current_selection[0] === undefined) {
						let message = "You didn't select anything. Select the mod folder you want to export.";
						if (has_mod_marker)
							message +=
								"\nThere is a DeadlineTestMod in the workspace, which is probably what you're trying to select. Select it and then click export again.";
						set_problem(message);

						return;
					}

					if (current_selection[0].IsA("Folder") === false) {
						let message =
							"You didn't select a folder, which means you likely didn't select the right thing. Select the mod folder you want to export.";
						if (has_mod_marker)
							message +=
								"\nThere is a DeadlineTestMod in the workspace, which is probably what you're trying to select. Select it and then click export again.";

						set_problem(message);

						return;
					}

					const [success, fail] = pcall(() => {
						const out = ModfilePackager.encode(current_selection[0]);

						const module = new Instance("ModuleScript");
						module.Source = `load_modfile('${out}')`;
						module.Parent = game.Workspace;

						Selection.Set([module]);
						plugin.PromptSaveSelection(`${current_selection[0].Name}.modfile`);
						Selection.Set(current_selection);
						module.Destroy();
					});

					if (!success) {
						set_problem(`error while exporting: ${fail}`);
					} else {
						set_problem("");
					}
				}}
				layout_order={4}
			/>

			<textlabel
				{...RESET_TEXTLABEL}
				TextColor3={SDK_UI_STYLE.col_error[0]}
				TextWrapped={true}
				TextXAlignment={"Left"}
				Text={problem}
				TextSize={16}
				Visible={problem !== ""}
				LayoutOrder={5}
			/>

			<frame
				Size={new UDim2(1, 0, 0, 1)}
				BackgroundColor3={SDK_UI_STYLE.zinc800[0]}
				BorderSizePixel={0}
				LayoutOrder={6}
			/>

			{/* import */}
			<textbox
				{...RESET_BUTTON}
				ref={input_ref}
				Size={new UDim2(1, 0, 0, 24)}
				Text={""}
				PlaceholderText={"Modfile source for decode"}
				BackgroundColor3={new Color3()}
				LayoutOrder={7}
			/>
			<Button
				text={"decode modfile to model"}
				onclick={() => {
					const ref = input_ref.current;
					if (!ref) return;

					const text = ref.Text.gsub(`load_modfile%('`, "")[0].gsub(`'%)`, "")[0];
					const output = ModfilePackager.decode_to_modfile(text);

					if (typeIs(output, "string")) return warn(output);
					unpack_modfile(output);
				}}
				layout_order={8}
			/>
		</frame>
	);
}
