import SignClient from "@walletconnect/sign-client";
import {SessionTypes} from "@walletconnect/types";
import {WalletConnectModal} from "@walletconnect/modal";
import {getSdkError} from "@walletconnect/utils";

export const PROJECT_ID = "YOUR_PROJECT_ID"

export const SIGN_OPTIONS = {
    logger: 'error',
    projectId: PROJECT_ID,
    relayUrl: "wss://relay.walletconnect.com",
    metadata: {
        name: "wallet-connect-box",
        description: "A sample app which connect to WalletConnect",
        url: window.location.origin,
        icons: [],
    }
}

export const CONNECT_PARAMS = {
    "optionalNamespaces": {
        "hedera": {
            "chains": [
                "hedera:testnet"
            ],
            "methods": [
                "hedera_signAndExecuteTransaction"
            ],
            "events": [
                "chainChanged",
                "accountsChanged"
            ]
        },
        "eip155": {
            "chains": [
                "eip155:296"
            ],
            "methods": [
                "eth_sendRawTransaction"
            ],
            "events": [
                "chainChanged",
                "accountsChanged"
            ]
        }
    }
}

export interface ConnectInfo {
    signClient: SignClient;
    session: SessionTypes.Struct
}

export async function connect(): Promise<ConnectInfo> {
    const signClient = await SignClient.init(SIGN_OPTIONS)
    const { uri, approval } = await signClient.connect(CONNECT_PARAMS)
    const connectModal = new WalletConnectModal({
        projectId: PROJECT_ID,
        explorerRecommendedWalletIds: [
            // https://walletguide.walletconnect.network
            "a29498d225fa4b13468ff4d6cf4ae0ea4adcbd95f07ce8a843a1dee10b632f3f", // HashPack
            "a9104b630bac1929ad9ac2a73a17ed4beead1889341f307bff502f89b46c8501", // Blade
            "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // Metamask
            "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // Coinbase
        ]
    })
    await connectModal.openModal({ uri })
    const session = await approval()
    connectModal.closeModal()
    return { signClient, session }
}

export async function disconnect(info: ConnectInfo): Promise<void> {
    const disconnectOptions = {
        topic: info.session.topic,
        reason: getSdkError('USER_DISCONNECTED')
    }
    await info.signClient.disconnect(disconnectOptions)
}
