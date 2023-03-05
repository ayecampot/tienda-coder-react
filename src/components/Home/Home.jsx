import { ItemListContainer } from "../ItemListContainer/ItemListContainer"
import Hero from "../Hero/Hero"
const Home = ({personalizar}) => {
    return (
        <>
            <Hero mensaje={personalizar}/>
            <ItemListContainer/>
        </>
    )
}
export default Home