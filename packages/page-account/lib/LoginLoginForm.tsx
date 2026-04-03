import { Button, Field, FieldList, Icon, Para, TextField } from "@keybr/widget";
import { mdiRepeat, mdiSend } from "@mdi/js";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { type SignInActions } from "./actions.ts";

export function LoginLoginForm({ actions }: { actions: SignInActions }) {
  const { formatMessage } = useIntl();
  const [login, setLogin] = useState("");
  const [{ state, message }, setState] = useState<{
    state: "normal" | "sending" | "success" | "error";
    message: string | null;
  }>({ state: "normal", message: null });

  const handleChangeLogin = (value: string) => {
    setLogin(value);
  };

  const handleClickLogin = () => {
    if (login !== "") {
      setState({ state: "sending", message: null });
      actions
        .registerLogin(login.trim())
        .then(() => {
          setState({ state: "success", message: null });
          window.location.href = `/login/${login}`;
        })
        .catch((error) => {
          setState({ state: "error", message: error.message });
        });
    }
  };

  const handleClickRetry = () => {
    setState({ state: "normal", message: null });
  };

  switch (state) {
    case "sending":
      return (
        <>
          <Para>
            <FormattedMessage
              id="account.emailState.sendingText"
              defaultMessage="Sending an e-mail with the login link to <strong>{login}</strong>... Please wait a second."
              values={{ login }}
            />
          </Para>
        </>
      );

    case "success":
      return (
        <>
          <Para>
            <FormattedMessage
              id="account.emailState.sentText"
              defaultMessage="We have sent an e-mail with the login link to <strong>{login}</strong>. It should arrive soon, please check your inbox in a minute or two."
              values={{ login }}
            />
          </Para>

          <Para>
            <Button
              size={16}
              icon={<Icon shape={mdiRepeat} />}
              label={formatMessage({
                id: "t_Resend",
                defaultMessage: "Resend",
              })}
              onClick={handleClickRetry}
            />
          </Para>
        </>
      );

    case "error":
      return (
        <>
          <Para>
            <FormattedMessage
              id="account.emailState.errorText"
              defaultMessage="Could not send e-mail to <strong>{login}</strong>: {message}"
              values={{ login, message }}
            />
          </Para>

          <Para>
            <Button
              size={16}
              icon={<Icon shape={mdiRepeat} />}
              label={formatMessage({
                id: "t_Retry",
                defaultMessage: "Retry",
              })}
              onClick={handleClickRetry}
            />
          </Para>
        </>
      );

    default:
      return (
        <>
          <FieldList>
            <Field>
              <TextField
                size={24}
                type="email"
                placeholder={formatMessage({
                  id: "t_Your_login",
                  defaultMessage: "Your login",
                })}
                value={login}
                onChange={handleChangeLogin}
              />
            </Field>
            <Field>
              <Button
                size={16}
                icon={<Icon shape={mdiSend} />}
                label={formatMessage({
                  id: "t_Login",
                  defaultMessage: "LogIn",
                })}
                onClick={handleClickLogin}
              />
            </Field>
          </FieldList>
        </>
      );
  }
}
