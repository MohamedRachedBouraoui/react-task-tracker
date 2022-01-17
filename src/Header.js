const Header = ({title}) => {

   

    return (
        <header >
            <h1>{title}</h1>
        </header>
    )
}


Header.defaultProps={title:"default title"} /// used if we dont pass a title prop to this component
export default Header
