import "../styles/landing-page.css"

type HeaderProps = {
    headerText: string;
};

export default function Header({headerText}:HeaderProps) {
  
    return (        
        <div className="header" >{headerText}</div>             
    );
  }

