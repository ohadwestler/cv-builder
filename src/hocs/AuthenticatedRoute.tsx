import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import Loading from "@/components/Loading";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

    useEffect(() => {
        if (!loading && !session) {
            router.push("/login");
        }
    }, [loading, session, router]);

    if (loading) {
        return <Loading />
    }

    if (!session) {
        return null
    }

    return <Box
    sx={{
      padding: "2rem",
      "@media (min-width: 600px)": {
        padding: "2rem 5rem",
        flex:1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      },
      "@media (min-width: 960px)": {
        padding: "2rem 10rem",
        flex:1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      },
    }}
  >{children}</Box>;
};

export default ProtectedRoute;
