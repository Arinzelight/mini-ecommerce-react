/* eslint-disable prettier/prettier */
import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { Provider as ReduxProvider} from "react-redux";

import { store } from "@/store/store";

export function Provider({ children }) {
  const navigate = useNavigate();

  return (
    <ReduxProvider store={store}>
      <HeroUIProvider
        navigate={navigate}
        theme={{
          colors: {
            primary: "#4A90E2",
            secondary: "#50E3C2",
          },
        }}
        useHref={useHref}
      >
        {children}
      </HeroUIProvider>
    </ReduxProvider>
  );
}
