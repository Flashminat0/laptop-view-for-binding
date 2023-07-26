import type {NextPage} from "next";
import {Layout} from "layout";
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/router";
import SimpleButton from "../../components/common/SimpleButton";

const Dashboard: NextPage = () => {
    const {user} = useAuth();
    const router = useRouter();

    return (
        <Layout>
            <main className="p-4">
                <div className="container mx-auto flex flex-col items-center">
                    <h1 className="text-2xl text-center">Your Dashboard</h1>
                    <p className="mt-4 text-lg text-center">
                        Welcome back {user?.displayName || user?.email}
                    </p>

                    <SimpleButton onClick={async ()=>{
                        await router.push('/bind')
                    }}>
                        Bind This Laptop
                    </SimpleButton>

                </div>
            </main>
        </Layout>
    );
};

export default Dashboard;
