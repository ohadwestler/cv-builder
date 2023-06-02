import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

    useEffect(() => {
        
        if (!loading && session) {
            router.push(process.env.NODE_ENV === 'production' ? 'https://cv-builder-project-ohad.netlify.app/login' :`/`);
        }
    }, [loading, session, router]);

    if (loading) {
        return <Loading />
    }

    return <>{children}</>;
};

export default ProtectedRoute;
