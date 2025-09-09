import type { UserData } from "@/types";
import {
    createContext, useContext, useEffect, useMemo, useState, type ReactNode,
} from "react";
import { useProfile } from "@/hooks/useUser";
import SplashScreen from "@/components/SplashScreen";
import AdminOnboardingFormModal from "@/components/modal/AdminOnboardingFormModal";

type AppContextType = {
    user: UserData | null;
    isReady: boolean;
    setUser: (user: UserData | null) => void;
    authUser: (user: UserData) => void;
    setIsReady: (val: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(true);
    const [user, setUser] = useState<UserData | null>(null);
    const [isReady, setIsReady] = useState(false);
    const { data, isLoading } = useProfile();

    const authUser = (newUser: UserData) => setUser(newUser);
    useEffect(() => {
        if (!isLoading) {
            const profile: UserData | null =
                (data as { data?: UserData } | undefined)?.data ?? null;
            setUser(profile);
            setIsReady(true);
        }
    }, [isLoading, data]);
    7
    const value = useMemo(
        () => ({ user, isReady, setUser, authUser, setIsReady }),
        [user, isReady]
    );

    return (
        <AppContext.Provider value={value}>
            {user?.profile?.role === "admin" && !user?.profile?.is_company ?
                < AdminOnboardingFormModal
                    setOpen={setOpen}
                    open={open}
                />
                :
                <>
                    <SplashScreen
                        show={isLoading}
                        fadeMs={2000}
                        appName="Docsify"
                        subtitle="Preparing your workspace…"
                        tip="Pro tip: Generate a safety meeting from any topic."
                    />
                    {children}
                </>
            }
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext must be used within an AppProvider");
    return ctx;
};
