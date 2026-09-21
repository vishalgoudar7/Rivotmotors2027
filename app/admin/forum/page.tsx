import {redirect} from "next/navigation";
import {requireAdmin} from "../_lib/session";
import {ForumManagement} from "@/components/Forum/ForumManagement";
export const dynamic="force-dynamic";
export default async function AdminForumPage(){if(!await requireAdmin())redirect("/admin/login");return <ForumManagement/>}
