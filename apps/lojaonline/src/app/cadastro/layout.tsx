import  ProvedorSesão  from "@/data/contexts/ContextoSesao";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Layout(props: any){
    return (
        <div>
            <ProvedorSesão>{props.choeldren}</ProvedorSesão>
        </div>
    )
}