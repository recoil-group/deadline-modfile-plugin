export function refresh_script_sources(instance: Instance): void {
	// eslint-disable-next-line roblox-ts/no-array-pairs
	for (const [_, value] of pairs(instance.GetDescendants())) {
		if (value.IsA("LuaSourceContainer")) {
			const cloned = value.Clone();
			cloned.Parent = value.Parent;
			value.Destroy();
		}
	}
}
