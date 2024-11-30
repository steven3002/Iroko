import { MdHome, MdOutlineHome } from "react-icons/md";
import { HiCircleStack, HiOutlineCircleStack } from "react-icons/hi2";
import { AiFillDollarCircle, AiOutlineDollar } from "react-icons/ai";

const NavRoutes = [
    {
        name: 'Home',
        icon: (fill) => {
            if(fill) return <MdHome className="lyn-icon fill" />;
            else return <MdOutlineHome className="lyn-icon" />;
        },
        link: '/app'
    },
    {
        name: 'Invest',
        icon: (fill) => {
            if(fill) return <HiCircleStack className="lyn-icon fill" />;
            else return <HiOutlineCircleStack className="lyn-icon" />;
        },
        link: '/app/invest'
    },
    {
        name: 'Trade',
        icon: (fill) => {
            if(fill) return <AiFillDollarCircle className="lyn-icon fill" />;
            else return <AiOutlineDollar className="lyn-icon" />;
        },
        link: '/app'
    }
];

export default NavRoutes;