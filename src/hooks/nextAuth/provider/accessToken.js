function storeApiTokens(token, user, account) {
  const accessToken =
    account?.accessToken || user?.accessToken || token.accessToken;
  const refreshToken =
    account?.refreshToken || user?.refreshToken || token.refreshToken;
  return { accessToken, refreshToken };
}

export default storeApiTokens;
