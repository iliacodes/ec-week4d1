import styles from "../styles/InstructionsComponent.module.css";
import { useRouter } from "next/router";
import { useSigner, useNetwork } from "wagmi";
import { useEffect, useState } from "react";

export default function InstructionsComponent() {
  const router = useRouter();

	function ApiInfo() {
		const [data, setData] = useState(null);
		const [isLoading, setIsLoading] = useState(false);

		useEffect(() => {
			setIsLoading(true);
			fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum")
				.then((res) => res.json())
				.then((data) => {
					setData(data);
					setIsLoading(false);
				})
		}, []);

		if (isLoading) {
	}

  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>My dApp</h1>
      </header>

      <div className={styles.buttons_container}>
        <PageBody />
      </div>

      <div className={styles.footer}>Footer</div>
    </div>
  );
}

function PageBody() {
  return (
    <div>
      <WalletInfo />
    </div>
  );
}

function WalletInfo() {
  const { signer, isError, isLoading } = useSigner();
  const { chain } = useNetwork();

  if (signer) {
    return (
      <>
        <p>Your account address is {signer._address}</p>
        <p>Connected to the {chain.name} network</p>
        <button onClick={() => signMessage(signer, "I love potatoes.")}>
          Sign
        </button>
        <WalletBalance />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <p>Wait a while, the wallet is loading</p>
      </>
    );
  }

  return (
    <>
      <p>Connect a wallet.</p>
    </>
  );
}

function WalletBalance() {
  // Implement the component logic for displaying the wallet balance
  return null;
}

function signMessage(signer, message) {
  signer
    .signMessage(message)
    .then((signature) => {
      console.log(signature);
    })
    .catch((err) => {
      console.log(err);
    });
}
