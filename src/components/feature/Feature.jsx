import './feature.scss'
import FeatureItem from "../featureItem/FeatureItem.jsx";

import IconChat from '/img/icon-chat.png?url'
import IconMoney from '/img/icon-money.png?url'
import IconSecurity from '/img/icon-security.png?url'

const Feature = () => {
  return (
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeatureItem title={"You are our #1 priority"}
                     description={"Need to talk to a representative? You can get in touch through our\n" +
                         "            24/7 chat or through a phone call in less than 5 minutes."}
                     icon={IconChat}
        />
        <FeatureItem title={"More savings means higher rates"}
                     description={"The more you save with us, the higher your interest rate will be!"}
                     icon={IconMoney}
        />
        <FeatureItem title={"Security you can trust"}
                     description={"We use top of the line encryption to make sure your data and money\n" +
                         "            is always safe."}
                     icon={IconSecurity}
        />
      </section>
  );
}

export default Feature;