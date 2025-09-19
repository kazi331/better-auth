import { auth } from "@/lib/auth";

export default async function Page() {
    const session = await auth()
    console.log(session);
    return (
        <div>Page</div>
    )
}
