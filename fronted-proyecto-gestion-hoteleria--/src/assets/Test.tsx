import {
    FC,
    useEffect,
} from 'react';

type TestProps = object;

const test: FC<TestProps> = () => {
    useEffect(() => {
        //inicializacion del componente
        console.log("el componente se crea");

        return () => {
            // esto se ejecuta cuando el componente muere
            console.log("el componente se destruye");
        }
    }, []);
    return (
        <div>

        </div>
    );
}
    
     export default test;