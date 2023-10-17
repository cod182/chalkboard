declare interface InfoCardProps {
  title: string;
  iconSrc: String;
  value: String;
  borderColor: String;
}

const PriceInfoCard = ({
  title,
  iconSrc,
  value,
  borderColor,
}: InfoCardProps) => {
  return <div className={`price-info_card border-l-[${borderColor}]`}>
    
  </div>;
};

export default PriceInfoCard;
