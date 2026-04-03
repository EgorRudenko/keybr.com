import { Article, Header } from "@keybr/widget";
import { FormattedMessage } from "react-intl";
import { AccountName } from "./AccountName.tsx";
import { AccountPricePreview } from "./AccountPricePreview.tsx";
import { type SignInActions } from "./actions.ts";
import { LoginLoginForm } from "./LoginLoginForm.tsx";
import { OAuthLoginForm } from "./OAuthLoginForm.tsx";

export function SignInSection({ actions }: { actions: SignInActions }) {
  return (
    <Article>
      <Header level={2}>
        <FormattedMessage
          id="t_Signin_with_login"
          defaultMessage="Sign-in with login"
        />
      </Header>

      <LoginLoginForm actions={actions} />
    </Article>
  );
}
