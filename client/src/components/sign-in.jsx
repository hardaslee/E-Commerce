import { signInWithGooglePopup } from "../utils/firebase.utils";

function SignIn() {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    };

    return (
        <div>
            <button onClick={logGoogleUser}>Sign In with Google</button>
        </div>
    );
}
export default SignIn;
