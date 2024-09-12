import React, { createContext, ReactNode, useState, useContext } from "react";

interface ChannelsContextType {
  channelId: string;
  setChannelId: (value: string) => void;
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(
  undefined,
);

export const ChannelsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [channelId, setChannelId] = useState<string>(`${process.env.EXPO_PUBLIC_FIRST_CHANNEL}`);

  return (
    <ChannelsContext.Provider value={{ channelId, setChannelId }}>
      {children}
    </ChannelsContext.Provider>
  );
};

export const useChannels = (): ChannelsContextType => {
  const context = useContext(ChannelsContext);
  if (!context) {
    throw new Error("useVariable must be used within a VariableProvider");
  }
  return context;
};
