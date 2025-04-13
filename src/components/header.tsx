import "../styles/header-styles.css"

type HeaderProps = {
    gameClass:string
    headerText: string;
};

export default function Header({gameClass,headerText}:HeaderProps) {
  
    return (        
        <div className={`header ${gameClass}`} >{headerText}</div>             
    );
  }

