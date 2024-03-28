"use client";

import { usePathname } from "next/navigation";

const Index = () => {
	const path = usePathname();
	const id = path.split("/").pop();
	return <div>Tags: {id}</div>;
};

export default Index;
