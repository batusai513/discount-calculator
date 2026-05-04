import { type RefObject, useEffect } from 'react';
import { useActionData, useNavigation } from 'react-router';

export function useResetForm($form: RefObject<HTMLFormElement | null>) {
  const navigation = useNavigation();
  const actionData = useActionData();

  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === 'idle' && (actionData as { ok?: boolean })?.ok) {
        $form.current?.reset();
      }
    },
    [navigation.state, actionData, $form]
  );
}
