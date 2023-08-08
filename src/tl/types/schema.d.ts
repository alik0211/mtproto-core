export interface Methods {
  invokeAfterMsg: {
    params: {
      msg_id?: number;
      query: unknown;
    };
    return: unknown;
  };
  invokeAfterMsgs: {
    params: {
      msg_ids?: Array<number>;
      query: unknown;
    };
    return: unknown;
  };
  'auth.sendCode': {
    params: {
      phone_number?: string;
      api_id?: number;
      api_hash?: string;
      settings: CodeSettings;
    };
    return: auth_SentCode;
  };
  'auth.signUp': {
    params: {
      phone_number?: string;
      phone_code_hash?: string;
      first_name?: string;
      last_name?: string;
    };
    return: auth_Authorization;
  };
  'auth.signIn': {
    params: {
      phone_number?: string;
      phone_code_hash?: string;
      phone_code?: string;
      email_verification?: EmailVerification;
    };
    return: auth_Authorization;
  };
  'auth.logOut': {
    params?: {};
    return: auth_LoggedOut;
  };
  'auth.resetAuthorizations': {
    params?: {};
    return: boolean;
  };
  'auth.exportAuthorization': {
    params: {
      dc_id?: number;
    };
    return: auth_ExportedAuthorization;
  };
  'auth.importAuthorization': {
    params: {
      id?: number;
      bytes?: Uint8Array;
    };
    return: auth_Authorization;
  };
  'auth.bindTempAuthKey': {
    params: {
      perm_auth_key_id?: number;
      nonce?: number;
      expires_at?: number;
      encrypted_message?: Uint8Array;
    };
    return: boolean;
  };
  'account.registerDevice': {
    params: {
      no_muted?: boolean;
      token_type?: number;
      token?: string;
      app_sandbox?: boolean;
      secret?: Uint8Array;
      other_uids?: Array<number>;
    };
    return: boolean;
  };
  'account.unregisterDevice': {
    params: {
      token_type?: number;
      token?: string;
      other_uids?: Array<number>;
    };
    return: boolean;
  };
  'account.updateNotifySettings': {
    params: {
      peer: InputNotifyPeer;
      settings: InputPeerNotifySettings;
    };
    return: boolean;
  };
  'account.getNotifySettings': {
    params: {
      peer: InputNotifyPeer;
    };
    return: PeerNotifySettings;
  };
  'account.resetNotifySettings': {
    params?: {};
    return: boolean;
  };
  'account.updateProfile': {
    params: {
      first_name?: string;
      last_name?: string;
      about?: string;
    };
    return: User;
  };
  'account.updateStatus': {
    params: {
      offline?: boolean;
    };
    return: boolean;
  };
  'account.getWallPapers': {
    params: {
      hash?: number;
    };
    return: account_WallPapers;
  };
  'account.reportPeer': {
    params: {
      peer: InputPeer;
      reason: ReportReason;
      message?: string;
    };
    return: boolean;
  };
  'users.getUsers': {
    params: {
      id: Array<InputUser>;
    };
    return: Array<User>;
  };
  'users.getFullUser': {
    params: {
      id: InputUser;
    };
    return: users_UserFull;
  };
  'contacts.getContactIDs': {
    params: {
      hash?: number;
    };
    return: Array<number>;
  };
  'contacts.getStatuses': {
    params?: {};
    return: Array<ContactStatus>;
  };
  'contacts.getContacts': {
    params: {
      hash?: number;
    };
    return: contacts_Contacts;
  };
  'contacts.importContacts': {
    params: {
      contacts: Array<InputContact>;
    };
    return: contacts_ImportedContacts;
  };
  'contacts.deleteContacts': {
    params: {
      id: Array<InputUser>;
    };
    return: Updates;
  };
  'contacts.deleteByPhones': {
    params: {
      phones?: Array<string>;
    };
    return: boolean;
  };
  'contacts.block': {
    params: {
      id: InputPeer;
    };
    return: boolean;
  };
  'contacts.unblock': {
    params: {
      id: InputPeer;
    };
    return: boolean;
  };
  'contacts.getBlocked': {
    params: {
      offset?: number;
      limit?: number;
    };
    return: contacts_Blocked;
  };
  'messages.getMessages': {
    params: {
      id: Array<InputMessage>;
    };
    return: messages_Messages;
  };
  'messages.getDialogs': {
    params: {
      exclude_pinned?: boolean;
      folder_id?: number;
      offset_date?: number;
      offset_id?: number;
      offset_peer: InputPeer;
      limit?: number;
      hash?: number;
    };
    return: messages_Dialogs;
  };
  'messages.getHistory': {
    params: {
      peer: InputPeer;
      offset_id?: number;
      offset_date?: number;
      add_offset?: number;
      limit?: number;
      max_id?: number;
      min_id?: number;
      hash?: number;
    };
    return: messages_Messages;
  };
  'messages.search': {
    params: {
      peer: InputPeer;
      q?: string;
      from_id?: InputPeer;
      top_msg_id?: number;
      filter: MessagesFilter;
      min_date?: number;
      max_date?: number;
      offset_id?: number;
      add_offset?: number;
      limit?: number;
      max_id?: number;
      min_id?: number;
      hash?: number;
    };
    return: messages_Messages;
  };
  'messages.readHistory': {
    params: {
      peer: InputPeer;
      max_id?: number;
    };
    return: messages_AffectedMessages;
  };
  'messages.deleteHistory': {
    params: {
      just_clear?: boolean;
      revoke?: boolean;
      peer: InputPeer;
      max_id?: number;
      min_date?: number;
      max_date?: number;
    };
    return: messages_AffectedHistory;
  };
  'messages.deleteMessages': {
    params: {
      revoke?: boolean;
      id?: Array<number>;
    };
    return: messages_AffectedMessages;
  };
  'messages.receivedMessages': {
    params: {
      max_id?: number;
    };
    return: Array<ReceivedNotifyMessage>;
  };
  'messages.setTyping': {
    params: {
      peer: InputPeer;
      top_msg_id?: number;
      action: SendMessageAction;
    };
    return: boolean;
  };
  'messages.sendMessage': {
    params: {
      no_webpage?: boolean;
      silent?: boolean;
      background?: boolean;
      clear_draft?: boolean;
      noforwards?: boolean;
      update_stickersets_order?: boolean;
      peer: InputPeer;
      reply_to_msg_id?: number;
      top_msg_id?: number;
      message?: string;
      random_id?: number;
      reply_markup?: ReplyMarkup;
      entities?: Array<MessageEntity>;
      schedule_date?: number;
      send_as?: InputPeer;
    };
    return: Updates;
  };
  'messages.sendMedia': {
    params: {
      silent?: boolean;
      background?: boolean;
      clear_draft?: boolean;
      noforwards?: boolean;
      update_stickersets_order?: boolean;
      peer: InputPeer;
      reply_to_msg_id?: number;
      top_msg_id?: number;
      media: InputMedia;
      message?: string;
      random_id?: number;
      reply_markup?: ReplyMarkup;
      entities?: Array<MessageEntity>;
      schedule_date?: number;
      send_as?: InputPeer;
    };
    return: Updates;
  };
  'messages.forwardMessages': {
    params: {
      silent?: boolean;
      background?: boolean;
      with_my_score?: boolean;
      drop_author?: boolean;
      drop_media_captions?: boolean;
      noforwards?: boolean;
      from_peer: InputPeer;
      id?: Array<number>;
      random_id?: Array<number>;
      to_peer: InputPeer;
      top_msg_id?: number;
      schedule_date?: number;
      send_as?: InputPeer;
    };
    return: Updates;
  };
  'messages.reportSpam': {
    params: {
      peer: InputPeer;
    };
    return: boolean;
  };
  'messages.getPeerSettings': {
    params: {
      peer: InputPeer;
    };
    return: messages_PeerSettings;
  };
  'messages.report': {
    params: {
      peer: InputPeer;
      id?: Array<number>;
      reason: ReportReason;
      message?: string;
    };
    return: boolean;
  };
  'messages.getChats': {
    params: {
      id?: Array<number>;
    };
    return: messages_Chats;
  };
  'messages.getFullChat': {
    params: {
      chat_id?: number;
    };
    return: messages_ChatFull;
  };
  'messages.editChatTitle': {
    params: {
      chat_id?: number;
      title?: string;
    };
    return: Updates;
  };
  'messages.editChatPhoto': {
    params: {
      chat_id?: number;
      photo: InputChatPhoto;
    };
    return: Updates;
  };
  'messages.addChatUser': {
    params: {
      chat_id?: number;
      user_id: InputUser;
      fwd_limit?: number;
    };
    return: Updates;
  };
  'messages.deleteChatUser': {
    params: {
      revoke_history?: boolean;
      chat_id?: number;
      user_id: InputUser;
    };
    return: Updates;
  };
  'messages.createChat': {
    params: {
      users: Array<InputUser>;
      title?: string;
      ttl_period?: number;
    };
    return: Updates;
  };
  'updates.getState': {
    params?: {};
    return: updates_State;
  };
  'updates.getDifference': {
    params: {
      pts?: number;
      pts_total_limit?: number;
      date?: number;
      qts?: number;
    };
    return: updates_Difference;
  };
  'photos.updateProfilePhoto': {
    params: {
      fallback?: boolean;
      bot?: InputUser;
      id: InputPhoto;
    };
    return: photos_Photo;
  };
  'photos.uploadProfilePhoto': {
    params: {
      fallback?: boolean;
      bot?: InputUser;
      file?: InputFile;
      video?: InputFile;
      video_start_ts?: number;
      video_emoji_markup?: VideoSize;
    };
    return: photos_Photo;
  };
  'photos.deletePhotos': {
    params: {
      id: Array<InputPhoto>;
    };
    return: Array<number>;
  };
  'upload.saveFilePart': {
    params: {
      file_id?: number;
      file_part?: number;
      bytes?: Uint8Array;
    };
    return: boolean;
  };
  'upload.getFile': {
    params: {
      precise?: boolean;
      cdn_supported?: boolean;
      location: InputFileLocation;
      offset?: number;
      limit?: number;
    };
    return: upload_File;
  };
  'help.getConfig': {
    params?: {};
    return: Config;
  };
  'help.getNearestDc': {
    params?: {};
    return: NearestDc;
  };
  'help.getAppUpdate': {
    params: {
      source?: string;
    };
    return: help_AppUpdate;
  };
  'help.getInviteText': {
    params?: {};
    return: help_InviteText;
  };
  'photos.getUserPhotos': {
    params: {
      user_id: InputUser;
      offset?: number;
      max_id?: number;
      limit?: number;
    };
    return: photos_Photos;
  };
  'messages.getDhConfig': {
    params: {
      version?: number;
      random_length?: number;
    };
    return: messages_DhConfig;
  };
  'messages.requestEncryption': {
    params: {
      user_id: InputUser;
      random_id?: number;
      g_a?: Uint8Array;
    };
    return: EncryptedChat;
  };
  'messages.acceptEncryption': {
    params: {
      peer: InputEncryptedChat;
      g_b?: Uint8Array;
      key_fingerprint?: number;
    };
    return: EncryptedChat;
  };
  'messages.discardEncryption': {
    params: {
      delete_history?: boolean;
      chat_id?: number;
    };
    return: boolean;
  };
  'messages.setEncryptedTyping': {
    params: {
      peer: InputEncryptedChat;
      typing?: boolean;
    };
    return: boolean;
  };
  'messages.readEncryptedHistory': {
    params: {
      peer: InputEncryptedChat;
      max_date?: number;
    };
    return: boolean;
  };
  'messages.sendEncrypted': {
    params: {
      silent?: boolean;
      peer: InputEncryptedChat;
      random_id?: number;
      data?: Uint8Array;
    };
    return: messages_SentEncryptedMessage;
  };
  'messages.sendEncryptedFile': {
    params: {
      silent?: boolean;
      peer: InputEncryptedChat;
      random_id?: number;
      data?: Uint8Array;
      file: InputEncryptedFile;
    };
    return: messages_SentEncryptedMessage;
  };
  'messages.sendEncryptedService': {
    params: {
      peer: InputEncryptedChat;
      random_id?: number;
      data?: Uint8Array;
    };
    return: messages_SentEncryptedMessage;
  };
  'messages.receivedQueue': {
    params: {
      max_qts?: number;
    };
    return: Array<number>;
  };
  'messages.reportEncryptedSpam': {
    params: {
      peer: InputEncryptedChat;
    };
    return: boolean;
  };
  'upload.saveBigFilePart': {
    params: {
      file_id?: number;
      file_part?: number;
      file_total_parts?: number;
      bytes?: Uint8Array;
    };
    return: boolean;
  };
  initConnection: {
    params: {
      api_id?: number;
      device_model?: string;
      system_version?: string;
      app_version?: string;
      system_lang_code?: string;
      lang_pack?: string;
      lang_code?: string;
      proxy?: InputClientProxy;
      params?: JSONValue;
      query: unknown;
    };
    return: unknown;
  };
  'help.getSupport': {
    params?: {};
    return: help_Support;
  };
  'messages.readMessageContents': {
    params: {
      id?: Array<number>;
    };
    return: messages_AffectedMessages;
  };
  'account.checkUsername': {
    params: {
      username?: string;
    };
    return: boolean;
  };
  'account.updateUsername': {
    params: {
      username?: string;
    };
    return: User;
  };
  'contacts.search': {
    params: {
      q?: string;
      limit?: number;
    };
    return: contacts_Found;
  };
  'account.getPrivacy': {
    params: {
      key: InputPrivacyKey;
    };
    return: account_PrivacyRules;
  };
  'account.setPrivacy': {
    params: {
      key: InputPrivacyKey;
      rules: Array<InputPrivacyRule>;
    };
    return: account_PrivacyRules;
  };
  'account.deleteAccount': {
    params: {
      reason?: string;
      password?: InputCheckPasswordSRP;
    };
    return: boolean;
  };
  'account.getAccountTTL': {
    params?: {};
    return: AccountDaysTTL;
  };
  'account.setAccountTTL': {
    params: {
      ttl: AccountDaysTTL;
    };
    return: boolean;
  };
  invokeWithLayer: {
    params: {
      layer?: number;
      query: unknown;
    };
    return: unknown;
  };
  'contacts.resolveUsername': {
    params: {
      username?: string;
    };
    return: contacts_ResolvedPeer;
  };
  'account.sendChangePhoneCode': {
    params: {
      phone_number?: string;
      settings: CodeSettings;
    };
    return: auth_SentCode;
  };
  'account.changePhone': {
    params: {
      phone_number?: string;
      phone_code_hash?: string;
      phone_code?: string;
    };
    return: User;
  };
  'messages.getStickers': {
    params: {
      emoticon?: string;
      hash?: number;
    };
    return: messages_Stickers;
  };
  'messages.getAllStickers': {
    params: {
      hash?: number;
    };
    return: messages_AllStickers;
  };
  'account.updateDeviceLocked': {
    params: {
      period?: number;
    };
    return: boolean;
  };
  'auth.importBotAuthorization': {
    params: {
      api_id?: number;
      api_hash?: string;
      bot_auth_token?: string;
    };
    return: auth_Authorization;
  };
  'messages.getWebPagePreview': {
    params: {
      message?: string;
      entities?: Array<MessageEntity>;
    };
    return: MessageMedia;
  };
  'account.getAuthorizations': {
    params?: {};
    return: account_Authorizations;
  };
  'account.resetAuthorization': {
    params: {
      hash?: number;
    };
    return: boolean;
  };
  'account.getPassword': {
    params?: {};
    return: account_Password;
  };
  'account.getPasswordSettings': {
    params: {
      password: InputCheckPasswordSRP;
    };
    return: account_PasswordSettings;
  };
  'account.updatePasswordSettings': {
    params: {
      password: InputCheckPasswordSRP;
      new_settings: account_PasswordInputSettings;
    };
    return: boolean;
  };
  'auth.checkPassword': {
    params: {
      password: InputCheckPasswordSRP;
    };
    return: auth_Authorization;
  };
  'auth.requestPasswordRecovery': {
    params?: {};
    return: auth_PasswordRecovery;
  };
  'auth.recoverPassword': {
    params: {
      code?: string;
      new_settings?: account_PasswordInputSettings;
    };
    return: auth_Authorization;
  };
  invokeWithoutUpdates: {
    params: {
      query: unknown;
    };
    return: unknown;
  };
  'messages.exportChatInvite': {
    params: {
      legacy_revoke_permanent?: boolean;
      request_needed?: boolean;
      peer: InputPeer;
      expire_date?: number;
      usage_limit?: number;
      title?: string;
    };
    return: ExportedChatInvite;
  };
  'messages.checkChatInvite': {
    params: {
      hash?: string;
    };
    return: ChatInvite;
  };
  'messages.importChatInvite': {
    params: {
      hash?: string;
    };
    return: Updates;
  };
  'messages.getStickerSet': {
    params: {
      stickerset: InputStickerSet;
      hash?: number;
    };
    return: messages_StickerSet;
  };
  'messages.installStickerSet': {
    params: {
      stickerset: InputStickerSet;
      archived?: boolean;
    };
    return: messages_StickerSetInstallResult;
  };
  'messages.uninstallStickerSet': {
    params: {
      stickerset: InputStickerSet;
    };
    return: boolean;
  };
  'messages.startBot': {
    params: {
      bot: InputUser;
      peer: InputPeer;
      random_id?: number;
      start_param?: string;
    };
    return: Updates;
  };
  'help.getAppChangelog': {
    params: {
      prev_app_version?: string;
    };
    return: Updates;
  };
  'messages.getMessagesViews': {
    params: {
      peer: InputPeer;
      id?: Array<number>;
      increment?: boolean;
    };
    return: messages_MessageViews;
  };
  'channels.readHistory': {
    params: {
      channel: InputChannel;
      max_id?: number;
    };
    return: boolean;
  };
  'channels.deleteMessages': {
    params: {
      channel: InputChannel;
      id?: Array<number>;
    };
    return: messages_AffectedMessages;
  };
  'channels.reportSpam': {
    params: {
      channel: InputChannel;
      participant: InputPeer;
      id?: Array<number>;
    };
    return: boolean;
  };
  'channels.getMessages': {
    params: {
      channel: InputChannel;
      id: Array<InputMessage>;
    };
    return: messages_Messages;
  };
  'channels.getParticipants': {
    params: {
      channel: InputChannel;
      filter: ChannelParticipantsFilter;
      offset?: number;
      limit?: number;
      hash?: number;
    };
    return: channels_ChannelParticipants;
  };
  'channels.getParticipant': {
    params: {
      channel: InputChannel;
      participant: InputPeer;
    };
    return: channels_ChannelParticipant;
  };
  'channels.getChannels': {
    params: {
      id: Array<InputChannel>;
    };
    return: messages_Chats;
  };
  'channels.getFullChannel': {
    params: {
      channel: InputChannel;
    };
    return: messages_ChatFull;
  };
  'channels.createChannel': {
    params: {
      broadcast?: boolean;
      megagroup?: boolean;
      for_import?: boolean;
      forum?: boolean;
      title?: string;
      about?: string;
      geo_point?: InputGeoPoint;
      address?: string;
      ttl_period?: number;
    };
    return: Updates;
  };
  'channels.editAdmin': {
    params: {
      channel: InputChannel;
      user_id: InputUser;
      admin_rights: ChatAdminRights;
      rank?: string;
    };
    return: Updates;
  };
  'channels.editTitle': {
    params: {
      channel: InputChannel;
      title?: string;
    };
    return: Updates;
  };
  'channels.editPhoto': {
    params: {
      channel: InputChannel;
      photo: InputChatPhoto;
    };
    return: Updates;
  };
  'channels.checkUsername': {
    params: {
      channel: InputChannel;
      username?: string;
    };
    return: boolean;
  };
  'channels.updateUsername': {
    params: {
      channel: InputChannel;
      username?: string;
    };
    return: boolean;
  };
  'channels.joinChannel': {
    params: {
      channel: InputChannel;
    };
    return: Updates;
  };
  'channels.leaveChannel': {
    params: {
      channel: InputChannel;
    };
    return: Updates;
  };
  'channels.inviteToChannel': {
    params: {
      channel: InputChannel;
      users: Array<InputUser>;
    };
    return: Updates;
  };
  'channels.deleteChannel': {
    params: {
      channel: InputChannel;
    };
    return: Updates;
  };
  'updates.getChannelDifference': {
    params: {
      force?: boolean;
      channel: InputChannel;
      filter: ChannelMessagesFilter;
      pts?: number;
      limit?: number;
    };
    return: updates_ChannelDifference;
  };
  'messages.editChatAdmin': {
    params: {
      chat_id?: number;
      user_id: InputUser;
      is_admin?: boolean;
    };
    return: boolean;
  };
  'messages.migrateChat': {
    params: {
      chat_id?: number;
    };
    return: Updates;
  };
  'messages.searchGlobal': {
    params: {
      folder_id?: number;
      q?: string;
      filter: MessagesFilter;
      min_date?: number;
      max_date?: number;
      offset_rate?: number;
      offset_peer: InputPeer;
      offset_id?: number;
      limit?: number;
    };
    return: messages_Messages;
  };
  'messages.reorderStickerSets': {
    params: {
      masks?: boolean;
      emojis?: boolean;
      order?: Array<number>;
    };
    return: boolean;
  };
  'messages.getDocumentByHash': {
    params: {
      sha256?: Uint8Array;
      size?: number;
      mime_type?: string;
    };
    return: Document;
  };
  'messages.getSavedGifs': {
    params: {
      hash?: number;
    };
    return: messages_SavedGifs;
  };
  'messages.saveGif': {
    params: {
      id: InputDocument;
      unsave?: boolean;
    };
    return: boolean;
  };
  'messages.getInlineBotResults': {
    params: {
      bot: InputUser;
      peer: InputPeer;
      geo_point?: InputGeoPoint;
      query?: string;
      offset?: string;
    };
    return: messages_BotResults;
  };
  'messages.setInlineBotResults': {
    params: {
      gallery?: boolean;
      private?: boolean;
      query_id?: number;
      results: Array<InputBotInlineResult>;
      cache_time?: number;
      next_offset?: string;
      switch_pm?: InlineBotSwitchPM;
      switch_webview?: InlineBotWebView;
    };
    return: boolean;
  };
  'messages.sendInlineBotResult': {
    params: {
      silent?: boolean;
      background?: boolean;
      clear_draft?: boolean;
      hide_via?: boolean;
      peer: InputPeer;
      reply_to_msg_id?: number;
      top_msg_id?: number;
      random_id?: number;
      query_id?: number;
      id?: string;
      schedule_date?: number;
      send_as?: InputPeer;
    };
    return: Updates;
  };
  'channels.exportMessageLink': {
    params: {
      grouped?: boolean;
      thread?: boolean;
      channel: InputChannel;
      id?: number;
    };
    return: ExportedMessageLink;
  };
  'channels.toggleSignatures': {
    params: {
      channel: InputChannel;
      enabled?: boolean;
    };
    return: Updates;
  };
  'auth.resendCode': {
    params: {
      phone_number?: string;
      phone_code_hash?: string;
    };
    return: auth_SentCode;
  };
  'auth.cancelCode': {
    params: {
      phone_number?: string;
      phone_code_hash?: string;
    };
    return: boolean;
  };
  'messages.getMessageEditData': {
    params: {
      peer: InputPeer;
      id?: number;
    };
    return: messages_MessageEditData;
  };
  'messages.editMessage': {
    params: {
      no_webpage?: boolean;
      peer: InputPeer;
      id?: number;
      message?: string;
      media?: InputMedia;
      reply_markup?: ReplyMarkup;
      entities?: Array<MessageEntity>;
      schedule_date?: number;
    };
    return: Updates;
  };
  'messages.editInlineBotMessage': {
    params: {
      no_webpage?: boolean;
      id: InputBotInlineMessageID;
      message?: string;
      media?: InputMedia;
      reply_markup?: ReplyMarkup;
      entities?: Array<MessageEntity>;
    };
    return: boolean;
  };
  'messages.getBotCallbackAnswer': {
    params: {
      game?: boolean;
      peer: InputPeer;
      msg_id?: number;
      data?: Uint8Array;
      password?: InputCheckPasswordSRP;
    };
    return: messages_BotCallbackAnswer;
  };
  'messages.setBotCallbackAnswer': {
    params: {
      alert?: boolean;
      query_id?: number;
      message?: string;
      url?: string;
      cache_time?: number;
    };
    return: boolean;
  };
  'contacts.getTopPeers': {
    params: {
      correspondents?: boolean;
      bots_pm?: boolean;
      bots_inline?: boolean;
      phone_calls?: boolean;
      forward_users?: boolean;
      forward_chats?: boolean;
      groups?: boolean;
      channels?: boolean;
      offset?: number;
      limit?: number;
      hash?: number;
    };
    return: contacts_TopPeers;
  };
  'contacts.resetTopPeerRating': {
    params: {
      category: TopPeerCategory;
      peer: InputPeer;
    };
    return: boolean;
  };
  'messages.getPeerDialogs': {
    params: {
      peers: Array<InputDialogPeer>;
    };
    return: messages_PeerDialogs;
  };
  'messages.saveDraft': {
    params: {
      no_webpage?: boolean;
      reply_to_msg_id?: number;
      top_msg_id?: number;
      peer: InputPeer;
      message?: string;
      entities?: Array<MessageEntity>;
    };
    return: boolean;
  };
  'messages.getAllDrafts': {
    params?: {};
    return: Updates;
  };
  'messages.getFeaturedStickers': {
    params: {
      hash?: number;
    };
    return: messages_FeaturedStickers;
  };
  'messages.readFeaturedStickers': {
    params: {
      id?: Array<number>;
    };
    return: boolean;
  };
  'messages.getRecentStickers': {
    params: {
      attached?: boolean;
      hash?: number;
    };
    return: messages_RecentStickers;
  };
  'messages.saveRecentSticker': {
    params: {
      attached?: boolean;
      id: InputDocument;
      unsave?: boolean;
    };
    return: boolean;
  };
  'messages.clearRecentStickers': {
    params: {
      attached?: boolean;
    };
    return: boolean;
  };
  'messages.getArchivedStickers': {
    params: {
      masks?: boolean;
      emojis?: boolean;
      offset_id?: number;
      limit?: number;
    };
    return: messages_ArchivedStickers;
  };
  'account.sendConfirmPhoneCode': {
    params: {
      hash?: string;
      settings: CodeSettings;
    };
    return: auth_SentCode;
  };
  'account.confirmPhone': {
    params: {
      phone_code_hash?: string;
      phone_code?: string;
    };
    return: boolean;
  };
  'channels.getAdminedPublicChannels': {
    params: {
      by_location?: boolean;
      check_limit?: boolean;
    };
    return: messages_Chats;
  };
  'messages.getMaskStickers': {
    params: {
      hash?: number;
    };
    return: messages_AllStickers;
  };
  'messages.getAttachedStickers': {
    params: {
      media: InputStickeredMedia;
    };
    return: Array<StickerSetCovered>;
  };
  'auth.dropTempAuthKeys': {
    params: {
      except_auth_keys?: Array<number>;
    };
    return: boolean;
  };
  'messages.setGameScore': {
    params: {
      edit_message?: boolean;
      force?: boolean;
      peer: InputPeer;
      id?: number;
      user_id: InputUser;
      score?: number;
    };
    return: Updates;
  };
  'messages.setInlineGameScore': {
    params: {
      edit_message?: boolean;
      force?: boolean;
      id: InputBotInlineMessageID;
      user_id: InputUser;
      score?: number;
    };
    return: boolean;
  };
  'messages.getGameHighScores': {
    params: {
      peer: InputPeer;
      id?: number;
      user_id: InputUser;
    };
    return: messages_HighScores;
  };
  'messages.getInlineGameHighScores': {
    params: {
      id: InputBotInlineMessageID;
      user_id: InputUser;
    };
    return: messages_HighScores;
  };
  'messages.getCommonChats': {
    params: {
      user_id: InputUser;
      max_id?: number;
      limit?: number;
    };
    return: messages_Chats;
  };
  'help.setBotUpdatesStatus': {
    params: {
      pending_updates_count?: number;
      message?: string;
    };
    return: boolean;
  };
  'messages.getWebPage': {
    params: {
      url?: string;
      hash?: number;
    };
    return: WebPage;
  };
  'messages.toggleDialogPin': {
    params: {
      pinned?: boolean;
      peer: InputDialogPeer;
    };
    return: boolean;
  };
  'messages.reorderPinnedDialogs': {
    params: {
      force?: boolean;
      folder_id?: number;
      order: Array<InputDialogPeer>;
    };
    return: boolean;
  };
  'messages.getPinnedDialogs': {
    params: {
      folder_id?: number;
    };
    return: messages_PeerDialogs;
  };
  'bots.sendCustomRequest': {
    params: {
      custom_method?: string;
      params: DataJSON;
    };
    return: DataJSON;
  };
  'bots.answerWebhookJSONQuery': {
    params: {
      query_id?: number;
      data: DataJSON;
    };
    return: boolean;
  };
  'upload.getWebFile': {
    params: {
      location: InputWebFileLocation;
      offset?: number;
      limit?: number;
    };
    return: upload_WebFile;
  };
  'payments.getPaymentForm': {
    params: {
      invoice: InputInvoice;
      theme_params?: DataJSON;
    };
    return: payments_PaymentForm;
  };
  'payments.getPaymentReceipt': {
    params: {
      peer: InputPeer;
      msg_id?: number;
    };
    return: payments_PaymentReceipt;
  };
  'payments.validateRequestedInfo': {
    params: {
      save?: boolean;
      invoice: InputInvoice;
      info: PaymentRequestedInfo;
    };
    return: payments_ValidatedRequestedInfo;
  };
  'payments.sendPaymentForm': {
    params: {
      form_id?: number;
      invoice: InputInvoice;
      requested_info_id?: string;
      shipping_option_id?: string;
      credentials: InputPaymentCredentials;
      tip_amount?: number;
    };
    return: payments_PaymentResult;
  };
  'account.getTmpPassword': {
    params: {
      password: InputCheckPasswordSRP;
      period?: number;
    };
    return: account_TmpPassword;
  };
  'payments.getSavedInfo': {
    params?: {};
    return: payments_SavedInfo;
  };
  'payments.clearSavedInfo': {
    params: {
      credentials?: boolean;
      info?: boolean;
    };
    return: boolean;
  };
  'messages.setBotShippingResults': {
    params: {
      query_id?: number;
      error?: string;
      shipping_options?: Array<ShippingOption>;
    };
    return: boolean;
  };
  'messages.setBotPrecheckoutResults': {
    params: {
      success?: boolean;
      query_id?: number;
      error?: string;
    };
    return: boolean;
  };
  'stickers.createStickerSet': {
    params: {
      masks?: boolean;
      animated?: boolean;
      videos?: boolean;
      emojis?: boolean;
      text_color?: boolean;
      user_id: InputUser;
      title?: string;
      short_name?: string;
      thumb?: InputDocument;
      stickers: Array<InputStickerSetItem>;
      software?: string;
    };
    return: messages_StickerSet;
  };
  'stickers.removeStickerFromSet': {
    params: {
      sticker: InputDocument;
    };
    return: messages_StickerSet;
  };
  'stickers.changeStickerPosition': {
    params: {
      sticker: InputDocument;
      position?: number;
    };
    return: messages_StickerSet;
  };
  'stickers.addStickerToSet': {
    params: {
      stickerset: InputStickerSet;
      sticker: InputStickerSetItem;
    };
    return: messages_StickerSet;
  };
  'messages.uploadMedia': {
    params: {
      peer: InputPeer;
      media: InputMedia;
    };
    return: MessageMedia;
  };
  'phone.getCallConfig': {
    params?: {};
    return: DataJSON;
  };
  'phone.requestCall': {
    params: {
      video?: boolean;
      user_id: InputUser;
      random_id?: number;
      g_a_hash?: Uint8Array;
      protocol: PhoneCallProtocol;
    };
    return: phone_PhoneCall;
  };
  'phone.acceptCall': {
    params: {
      peer: InputPhoneCall;
      g_b?: Uint8Array;
      protocol: PhoneCallProtocol;
    };
    return: phone_PhoneCall;
  };
  'phone.confirmCall': {
    params: {
      peer: InputPhoneCall;
      g_a?: Uint8Array;
      key_fingerprint?: number;
      protocol: PhoneCallProtocol;
    };
    return: phone_PhoneCall;
  };
  'phone.receivedCall': {
    params: {
      peer: InputPhoneCall;
    };
    return: boolean;
  };
  'phone.discardCall': {
    params: {
      video?: boolean;
      peer: InputPhoneCall;
      duration?: number;
      reason: PhoneCallDiscardReason;
      connection_id?: number;
    };
    return: Updates;
  };
  'phone.setCallRating': {
    params: {
      user_initiative?: boolean;
      peer: InputPhoneCall;
      rating?: number;
      comment?: string;
    };
    return: Updates;
  };
  'phone.saveCallDebug': {
    params: {
      peer: InputPhoneCall;
      debug: DataJSON;
    };
    return: boolean;
  };
  'upload.getCdnFile': {
    params: {
      file_token?: Uint8Array;
      offset?: number;
      limit?: number;
    };
    return: upload_CdnFile;
  };
  'upload.reuploadCdnFile': {
    params: {
      file_token?: Uint8Array;
      request_token?: Uint8Array;
    };
    return: Array<FileHash>;
  };
  'help.getCdnConfig': {
    params?: {};
    return: CdnConfig;
  };
  'langpack.getLangPack': {
    params: {
      lang_pack?: string;
      lang_code?: string;
    };
    return: LangPackDifference;
  };
  'langpack.getStrings': {
    params: {
      lang_pack?: string;
      lang_code?: string;
      keys?: Array<string>;
    };
    return: Array<LangPackString>;
  };
  'langpack.getDifference': {
    params: {
      lang_pack?: string;
      lang_code?: string;
      from_version?: number;
    };
    return: LangPackDifference;
  };
  'langpack.getLanguages': {
    params: {
      lang_pack?: string;
    };
    return: Array<LangPackLanguage>;
  };
  'channels.editBanned': {
    params: {
      channel: InputChannel;
      participant: InputPeer;
      banned_rights: ChatBannedRights;
    };
    return: Updates;
  };
  'channels.getAdminLog': {
    params: {
      channel: InputChannel;
      q?: string;
      events_filter?: ChannelAdminLogEventsFilter;
      admins?: Array<InputUser>;
      max_id?: number;
      min_id?: number;
      limit?: number;
    };
    return: channels_AdminLogResults;
  };
  'upload.getCdnFileHashes': {
    params: {
      file_token?: Uint8Array;
      offset?: number;
    };
    return: Array<FileHash>;
  };
  'messages.sendScreenshotNotification': {
    params: {
      peer: InputPeer;
      reply_to_msg_id?: number;
      random_id?: number;
    };
    return: Updates;
  };
  'channels.setStickers': {
    params: {
      channel: InputChannel;
      stickerset: InputStickerSet;
    };
    return: boolean;
  };
  'messages.getFavedStickers': {
    params: {
      hash?: number;
    };
    return: messages_FavedStickers;
  };
  'messages.faveSticker': {
    params: {
      id: InputDocument;
      unfave?: boolean;
    };
    return: boolean;
  };
  'channels.readMessageContents': {
    params: {
      channel: InputChannel;
      id?: Array<number>;
    };
    return: boolean;
  };
  'contacts.resetSaved': {
    params?: {};
    return: boolean;
  };
  'messages.getUnreadMentions': {
    params: {
      peer: InputPeer;
      top_msg_id?: number;
      offset_id?: number;
      add_offset?: number;
      limit?: number;
      max_id?: number;
      min_id?: number;
    };
    return: messages_Messages;
  };
  'channels.deleteHistory': {
    params: {
      for_everyone?: boolean;
      channel: InputChannel;
      max_id?: number;
    };
    return: Updates;
  };
  'help.getRecentMeUrls': {
    params: {
      referer?: string;
    };
    return: help_RecentMeUrls;
  };
  'channels.togglePreHistoryHidden': {
    params: {
      channel: InputChannel;
      enabled?: boolean;
    };
    return: Updates;
  };
  'messages.readMentions': {
    params: {
      peer: InputPeer;
      top_msg_id?: number;
    };
    return: messages_AffectedHistory;
  };
  'messages.getRecentLocations': {
    params: {
      peer: InputPeer;
      limit?: number;
      hash?: number;
    };
    return: messages_Messages;
  };
  'messages.sendMultiMedia': {
    params: {
      silent?: boolean;
      background?: boolean;
      clear_draft?: boolean;
      noforwards?: boolean;
      update_stickersets_order?: boolean;
      peer: InputPeer;
      reply_to_msg_id?: number;
      top_msg_id?: number;
      multi_media: Array<InputSingleMedia>;
      schedule_date?: number;
      send_as?: InputPeer;
    };
    return: Updates;
  };
  'messages.uploadEncryptedFile': {
    params: {
      peer: InputEncryptedChat;
      file: InputEncryptedFile;
    };
    return: EncryptedFile;
  };
  'account.getWebAuthorizations': {
    params?: {};
    return: account_WebAuthorizations;
  };
  'account.resetWebAuthorization': {
    params: {
      hash?: number;
    };
    return: boolean;
  };
  'account.resetWebAuthorizations': {
    params?: {};
    return: boolean;
  };
  'messages.searchStickerSets': {
    params: {
      exclude_featured?: boolean;
      q?: string;
      hash?: number;
    };
    return: messages_FoundStickerSets;
  };
  'upload.getFileHashes': {
    params: {
      location: InputFileLocation;
      offset?: number;
    };
    return: Array<FileHash>;
  };
  'help.getTermsOfServiceUpdate': {
    params?: {};
    return: help_TermsOfServiceUpdate;
  };
  'help.acceptTermsOfService': {
    params: {
      id: DataJSON;
    };
    return: boolean;
  };
  'account.getAllSecureValues': {
    params?: {};
    return: Array<SecureValue>;
  };
  'account.getSecureValue': {
    params: {
      types: Array<SecureValueType>;
    };
    return: Array<SecureValue>;
  };
  'account.saveSecureValue': {
    params: {
      value: InputSecureValue;
      secure_secret_id?: number;
    };
    return: SecureValue;
  };
  'account.deleteSecureValue': {
    params: {
      types: Array<SecureValueType>;
    };
    return: boolean;
  };
  'users.setSecureValueErrors': {
    params: {
      id: InputUser;
      errors: Array<SecureValueError>;
    };
    return: boolean;
  };
  'account.getAuthorizationForm': {
    params: {
      bot_id?: number;
      scope?: string;
      public_key?: string;
    };
    return: account_AuthorizationForm;
  };
  'account.acceptAuthorization': {
    params: {
      bot_id?: number;
      scope?: string;
      public_key?: string;
      value_hashes: Array<SecureValueHash>;
      credentials: SecureCredentialsEncrypted;
    };
    return: boolean;
  };
  'account.sendVerifyPhoneCode': {
    params: {
      phone_number?: string;
      settings: CodeSettings;
    };
    return: auth_SentCode;
  };
  'account.verifyPhone': {
    params: {
      phone_number?: string;
      phone_code_hash?: string;
      phone_code?: string;
    };
    return: boolean;
  };
  'account.sendVerifyEmailCode': {
    params: {
      purpose: EmailVerifyPurpose;
      email?: string;
    };
    return: account_SentEmailCode;
  };
  'account.verifyEmail': {
    params: {
      purpose: EmailVerifyPurpose;
      verification: EmailVerification;
    };
    return: account_EmailVerified;
  };
  'help.getDeepLinkInfo': {
    params: {
      path?: string;
    };
    return: help_DeepLinkInfo;
  };
  'contacts.getSaved': {
    params?: {};
    return: Array<SavedContact>;
  };
  'channels.getLeftChannels': {
    params: {
      offset?: number;
    };
    return: messages_Chats;
  };
  'account.initTakeoutSession': {
    params: {
      contacts?: boolean;
      message_users?: boolean;
      message_chats?: boolean;
      message_megagroups?: boolean;
      message_channels?: boolean;
      files?: boolean;
      file_max_size?: number;
    };
    return: account_Takeout;
  };
  'account.finishTakeoutSession': {
    params: {
      success?: boolean;
    };
    return: boolean;
  };
  'messages.getSplitRanges': {
    params?: {};
    return: Array<MessageRange>;
  };
  invokeWithMessagesRange: {
    params: {
      range: MessageRange;
      query: unknown;
    };
    return: unknown;
  };
  invokeWithTakeout: {
    params: {
      takeout_id?: number;
      query: unknown;
    };
    return: unknown;
  };
  'messages.markDialogUnread': {
    params: {
      unread?: boolean;
      peer: InputDialogPeer;
    };
    return: boolean;
  };
  'messages.getDialogUnreadMarks': {
    params?: {};
    return: Array<DialogPeer>;
  };
  'contacts.toggleTopPeers': {
    params: {
      enabled?: boolean;
    };
    return: boolean;
  };
  'messages.clearAllDrafts': {
    params?: {};
    return: boolean;
  };
  'help.getAppConfig': {
    params: {
      hash?: number;
    };
    return: help_AppConfig;
  };
  'help.saveAppLog': {
    params: {
      events: Array<InputAppEvent>;
    };
    return: boolean;
  };
  'help.getPassportConfig': {
    params: {
      hash?: number;
    };
    return: help_PassportConfig;
  };
  'langpack.getLanguage': {
    params: {
      lang_pack?: string;
      lang_code?: string;
    };
    return: LangPackLanguage;
  };
  'messages.updatePinnedMessage': {
    params: {
      silent?: boolean;
      unpin?: boolean;
      pm_oneside?: boolean;
      peer: InputPeer;
      id?: number;
    };
    return: Updates;
  };
  'account.confirmPasswordEmail': {
    params: {
      code?: string;
    };
    return: boolean;
  };
  'account.resendPasswordEmail': {
    params?: {};
    return: boolean;
  };
  'account.cancelPasswordEmail': {
    params?: {};
    return: boolean;
  };
  'help.getSupportName': {
    params?: {};
    return: help_SupportName;
  };
  'help.getUserInfo': {
    params: {
      user_id: InputUser;
    };
    return: help_UserInfo;
  };
  'help.editUserInfo': {
    params: {
      user_id: InputUser;
      message?: string;
      entities: Array<MessageEntity>;
    };
    return: help_UserInfo;
  };
  'account.getContactSignUpNotification': {
    params?: {};
    return: boolean;
  };
  'account.setContactSignUpNotification': {
    params: {
      silent?: boolean;
    };
    return: boolean;
  };
  'account.getNotifyExceptions': {
    params: {
      compare_sound?: boolean;
      peer?: InputNotifyPeer;
    };
    return: Updates;
  };
  'messages.sendVote': {
    params: {
      peer: InputPeer;
      msg_id?: number;
      options?: Array<Uint8Array>;
    };
    return: Updates;
  };
  'messages.getPollResults': {
    params: {
      peer: InputPeer;
      msg_id?: number;
    };
    return: Updates;
  };
  'messages.getOnlines': {
    params: {
      peer: InputPeer;
    };
    return: ChatOnlines;
  };
  'messages.editChatAbout': {
    params: {
      peer: InputPeer;
      about?: string;
    };
    return: boolean;
  };
  'messages.editChatDefaultBannedRights': {
    params: {
      peer: InputPeer;
      banned_rights: ChatBannedRights;
    };
    return: Updates;
  };
  'account.getWallPaper': {
    params: {
      wallpaper: InputWallPaper;
    };
    return: WallPaper;
  };
  'account.uploadWallPaper': {
    params: {
      for_chat?: boolean;
      file: InputFile;
      mime_type?: string;
      settings: WallPaperSettings;
    };
    return: WallPaper;
  };
  'account.saveWallPaper': {
    params: {
      wallpaper: InputWallPaper;
      unsave?: boolean;
      settings: WallPaperSettings;
    };
    return: boolean;
  };
  'account.installWallPaper': {
    params: {
      wallpaper: InputWallPaper;
      settings: WallPaperSettings;
    };
    return: boolean;
  };
  'account.resetWallPapers': {
    params?: {};
    return: boolean;
  };
  'account.getAutoDownloadSettings': {
    params?: {};
    return: account_AutoDownloadSettings;
  };
  'account.saveAutoDownloadSettings': {
    params: {
      low?: boolean;
      high?: boolean;
      settings: AutoDownloadSettings;
    };
    return: boolean;
  };
  'messages.getEmojiKeywords': {
    params: {
      lang_code?: string;
    };
    return: EmojiKeywordsDifference;
  };
  'messages.getEmojiKeywordsDifference': {
    params: {
      lang_code?: string;
      from_version?: number;
    };
    return: EmojiKeywordsDifference;
  };
  'messages.getEmojiKeywordsLanguages': {
    params: {
      lang_codes?: Array<string>;
    };
    return: Array<EmojiLanguage>;
  };
  'messages.getEmojiURL': {
    params: {
      lang_code?: string;
    };
    return: EmojiURL;
  };
  'folders.editPeerFolders': {
    params: {
      folder_peers: Array<InputFolderPeer>;
    };
    return: Updates;
  };
  'messages.getSearchCounters': {
    params: {
      peer: InputPeer;
      top_msg_id?: number;
      filters: Array<MessagesFilter>;
    };
    return: Array<messages_SearchCounter>;
  };
  'channels.getGroupsForDiscussion': {
    params?: {};
    return: messages_Chats;
  };
  'channels.setDiscussionGroup': {
    params: {
      broadcast: InputChannel;
      group: InputChannel;
    };
    return: boolean;
  };
  'messages.requestUrlAuth': {
    params: {
      peer?: InputPeer;
      msg_id?: number;
      button_id?: number;
      url?: string;
    };
    return: UrlAuthResult;
  };
  'messages.acceptUrlAuth': {
    params: {
      write_allowed?: boolean;
      peer?: InputPeer;
      msg_id?: number;
      button_id?: number;
      url?: string;
    };
    return: UrlAuthResult;
  };
  'messages.hidePeerSettingsBar': {
    params: {
      peer: InputPeer;
    };
    return: boolean;
  };
  'contacts.addContact': {
    params: {
      add_phone_privacy_exception?: boolean;
      id: InputUser;
      first_name?: string;
      last_name?: string;
      phone?: string;
    };
    return: Updates;
  };
  'contacts.acceptContact': {
    params: {
      id: InputUser;
    };
    return: Updates;
  };
  'channels.editCreator': {
    params: {
      channel: InputChannel;
      user_id: InputUser;
      password: InputCheckPasswordSRP;
    };
    return: Updates;
  };
  'contacts.getLocated': {
    params: {
      background?: boolean;
      geo_point: InputGeoPoint;
      self_expires?: number;
    };
    return: Updates;
  };
  'channels.editLocation': {
    params: {
      channel: InputChannel;
      geo_point: InputGeoPoint;
      address?: string;
    };
    return: boolean;
  };
  'channels.toggleSlowMode': {
    params: {
      channel: InputChannel;
      seconds?: number;
    };
    return: Updates;
  };
  'messages.getScheduledHistory': {
    params: {
      peer: InputPeer;
      hash?: number;
    };
    return: messages_Messages;
  };
  'messages.getScheduledMessages': {
    params: {
      peer: InputPeer;
      id?: Array<number>;
    };
    return: messages_Messages;
  };
  'messages.sendScheduledMessages': {
    params: {
      peer: InputPeer;
      id?: Array<number>;
    };
    return: Updates;
  };
  'messages.deleteScheduledMessages': {
    params: {
      peer: InputPeer;
      id?: Array<number>;
    };
    return: Updates;
  };
  'account.uploadTheme': {
    params: {
      file: InputFile;
      thumb?: InputFile;
      file_name?: string;
      mime_type?: string;
    };
    return: Document;
  };
  'account.createTheme': {
    params: {
      slug?: string;
      title?: string;
      document?: InputDocument;
      settings?: Array<InputThemeSettings>;
    };
    return: Theme;
  };
  'account.updateTheme': {
    params: {
      format?: string;
      theme: InputTheme;
      slug?: string;
      title?: string;
      document?: InputDocument;
      settings?: Array<InputThemeSettings>;
    };
    return: Theme;
  };
  'account.saveTheme': {
    params: {
      theme: InputTheme;
      unsave?: boolean;
    };
    return: boolean;
  };
  'account.installTheme': {
    params: {
      dark?: boolean;
      theme?: InputTheme;
      format?: string;
      base_theme?: BaseTheme;
    };
    return: boolean;
  };
  'account.getTheme': {
    params: {
      format?: string;
      theme: InputTheme;
    };
    return: Theme;
  };
  'account.getThemes': {
    params: {
      format?: string;
      hash?: number;
    };
    return: account_Themes;
  };
  'auth.exportLoginToken': {
    params: {
      api_id?: number;
      api_hash?: string;
      except_ids?: Array<number>;
    };
    return: auth_LoginToken;
  };
  'auth.importLoginToken': {
    params: {
      token?: Uint8Array;
    };
    return: auth_LoginToken;
  };
  'auth.acceptLoginToken': {
    params: {
      token?: Uint8Array;
    };
    return: Authorization;
  };
  'account.setContentSettings': {
    params: {
      sensitive_enabled?: boolean;
    };
    return: boolean;
  };
  'account.getContentSettings': {
    params?: {};
    return: account_ContentSettings;
  };
  'channels.getInactiveChannels': {
    params?: {};
    return: messages_InactiveChats;
  };
  'account.getMultiWallPapers': {
    params: {
      wallpapers: Array<InputWallPaper>;
    };
    return: Array<WallPaper>;
  };
  'messages.getPollVotes': {
    params: {
      peer: InputPeer;
      id?: number;
      option?: Uint8Array;
      offset?: string;
      limit?: number;
    };
    return: messages_VotesList;
  };
  'messages.toggleStickerSets': {
    params: {
      uninstall?: boolean;
      archive?: boolean;
      unarchive?: boolean;
      stickersets: Array<InputStickerSet>;
    };
    return: boolean;
  };
  'payments.getBankCardData': {
    params: {
      number?: string;
    };
    return: payments_BankCardData;
  };
  'messages.getDialogFilters': {
    params?: {};
    return: Array<DialogFilter>;
  };
  'messages.getSuggestedDialogFilters': {
    params?: {};
    return: Array<DialogFilterSuggested>;
  };
  'messages.updateDialogFilter': {
    params: {
      id?: number;
      filter?: DialogFilter;
    };
    return: boolean;
  };
  'messages.updateDialogFiltersOrder': {
    params: {
      order?: Array<number>;
    };
    return: boolean;
  };
  'stats.getBroadcastStats': {
    params: {
      dark?: boolean;
      channel: InputChannel;
    };
    return: stats_BroadcastStats;
  };
  'stats.loadAsyncGraph': {
    params: {
      token?: string;
      x?: number;
    };
    return: StatsGraph;
  };
  'stickers.setStickerSetThumb': {
    params: {
      stickerset: InputStickerSet;
      thumb?: InputDocument;
      thumb_document_id?: number;
    };
    return: messages_StickerSet;
  };
  'bots.setBotCommands': {
    params: {
      scope: BotCommandScope;
      lang_code?: string;
      commands: Array<BotCommand>;
    };
    return: boolean;
  };
  'messages.getOldFeaturedStickers': {
    params: {
      offset?: number;
      limit?: number;
      hash?: number;
    };
    return: messages_FeaturedStickers;
  };
  'help.getPromoData': {
    params?: {};
    return: help_PromoData;
  };
  'help.hidePromoData': {
    params: {
      peer: InputPeer;
    };
    return: boolean;
  };
  'phone.sendSignalingData': {
    params: {
      peer: InputPhoneCall;
      data?: Uint8Array;
    };
    return: boolean;
  };
  'stats.getMegagroupStats': {
    params: {
      dark?: boolean;
      channel: InputChannel;
    };
    return: stats_MegagroupStats;
  };
  'account.getGlobalPrivacySettings': {
    params?: {};
    return: GlobalPrivacySettings;
  };
  'account.setGlobalPrivacySettings': {
    params: {
      settings: GlobalPrivacySettings;
    };
    return: GlobalPrivacySettings;
  };
  'help.dismissSuggestion': {
    params: {
      peer: InputPeer;
      suggestion?: string;
    };
    return: boolean;
  };
  'help.getCountriesList': {
    params: {
      lang_code?: string;
      hash?: number;
    };
    return: help_CountriesList;
  };
  'messages.getReplies': {
    params: {
      peer: InputPeer;
      msg_id?: number;
      offset_id?: number;
      offset_date?: number;
      add_offset?: number;
      limit?: number;
      max_id?: number;
      min_id?: number;
      hash?: number;
    };
    return: messages_Messages;
  };
  'messages.getDiscussionMessage': {
    params: {
      peer: InputPeer;
      msg_id?: number;
    };
    return: messages_DiscussionMessage;
  };
  'messages.readDiscussion': {
    params: {
      peer: InputPeer;
      msg_id?: number;
      read_max_id?: number;
    };
    return: boolean;
  };
  'contacts.blockFromReplies': {
    params: {
      delete_message?: boolean;
      delete_history?: boolean;
      report_spam?: boolean;
      msg_id?: number;
    };
    return: Updates;
  };
  'stats.getMessagePublicForwards': {
    params: {
      channel: InputChannel;
      msg_id?: number;
      offset_rate?: number;
      offset_peer: InputPeer;
      offset_id?: number;
      limit?: number;
    };
    return: messages_Messages;
  };
  'stats.getMessageStats': {
    params: {
      dark?: boolean;
      channel: InputChannel;
      msg_id?: number;
    };
    return: stats_MessageStats;
  };
  'messages.unpinAllMessages': {
    params: {
      peer: InputPeer;
      top_msg_id?: number;
    };
    return: messages_AffectedHistory;
  };
  'phone.createGroupCall': {
    params: {
      rtmp_stream?: boolean;
      peer: InputPeer;
      random_id?: number;
      title?: string;
      schedule_date?: number;
    };
    return: Updates;
  };
  'phone.joinGroupCall': {
    params: {
      muted?: boolean;
      video_stopped?: boolean;
      call: InputGroupCall;
      join_as: InputPeer;
      invite_hash?: string;
      params: DataJSON;
    };
    return: Updates;
  };
  'phone.leaveGroupCall': {
    params: {
      call: InputGroupCall;
      source?: number;
    };
    return: Updates;
  };
  'phone.inviteToGroupCall': {
    params: {
      call: InputGroupCall;
      users: Array<InputUser>;
    };
    return: Updates;
  };
  'phone.discardGroupCall': {
    params: {
      call: InputGroupCall;
    };
    return: Updates;
  };
  'phone.toggleGroupCallSettings': {
    params: {
      reset_invite_hash?: boolean;
      call: InputGroupCall;
      join_muted?: boolean;
    };
    return: Updates;
  };
  'phone.getGroupCall': {
    params: {
      call: InputGroupCall;
      limit?: number;
    };
    return: phone_GroupCall;
  };
  'phone.getGroupParticipants': {
    params: {
      call: InputGroupCall;
      ids: Array<InputPeer>;
      sources?: Array<number>;
      offset?: string;
      limit?: number;
    };
    return: phone_GroupParticipants;
  };
  'phone.checkGroupCall': {
    params: {
      call: InputGroupCall;
      sources?: Array<number>;
    };
    return: Array<number>;
  };
  'messages.deleteChat': {
    params: {
      chat_id?: number;
    };
    return: boolean;
  };
  'messages.deletePhoneCallHistory': {
    params: {
      revoke?: boolean;
    };
    return: messages_AffectedFoundMessages;
  };
  'messages.checkHistoryImport': {
    params: {
      import_head?: string;
    };
    return: messages_HistoryImportParsed;
  };
  'messages.initHistoryImport': {
    params: {
      peer: InputPeer;
      file: InputFile;
      media_count?: number;
    };
    return: messages_HistoryImport;
  };
  'messages.uploadImportedMedia': {
    params: {
      peer: InputPeer;
      import_id?: number;
      file_name?: string;
      media: InputMedia;
    };
    return: MessageMedia;
  };
  'messages.startHistoryImport': {
    params: {
      peer: InputPeer;
      import_id?: number;
    };
    return: boolean;
  };
  'messages.getExportedChatInvites': {
    params: {
      revoked?: boolean;
      peer: InputPeer;
      admin_id: InputUser;
      offset_date?: number;
      offset_link?: string;
      limit?: number;
    };
    return: messages_ExportedChatInvites;
  };
  'messages.getExportedChatInvite': {
    params: {
      peer: InputPeer;
      link?: string;
    };
    return: messages_ExportedChatInvite;
  };
  'messages.editExportedChatInvite': {
    params: {
      revoked?: boolean;
      peer: InputPeer;
      link?: string;
      expire_date?: number;
      usage_limit?: number;
      request_needed?: boolean;
      title?: string;
    };
    return: messages_ExportedChatInvite;
  };
  'messages.deleteRevokedExportedChatInvites': {
    params: {
      peer: InputPeer;
      admin_id: InputUser;
    };
    return: boolean;
  };
  'messages.deleteExportedChatInvite': {
    params: {
      peer: InputPeer;
      link?: string;
    };
    return: boolean;
  };
  'messages.getAdminsWithInvites': {
    params: {
      peer: InputPeer;
    };
    return: messages_ChatAdminsWithInvites;
  };
  'messages.getChatInviteImporters': {
    params: {
      requested?: boolean;
      peer: InputPeer;
      link?: string;
      q?: string;
      offset_date?: number;
      offset_user: InputUser;
      limit?: number;
    };
    return: messages_ChatInviteImporters;
  };
  'messages.setHistoryTTL': {
    params: {
      peer: InputPeer;
      period?: number;
    };
    return: Updates;
  };
  'account.reportProfilePhoto': {
    params: {
      peer: InputPeer;
      photo_id: InputPhoto;
      reason: ReportReason;
      message?: string;
    };
    return: boolean;
  };
  'channels.convertToGigagroup': {
    params: {
      channel: InputChannel;
    };
    return: Updates;
  };
  'messages.checkHistoryImportPeer': {
    params: {
      peer: InputPeer;
    };
    return: messages_CheckedHistoryImportPeer;
  };
  'phone.toggleGroupCallRecord': {
    params: {
      start?: boolean;
      video?: boolean;
      call: InputGroupCall;
      title?: string;
      video_portrait?: boolean;
    };
    return: Updates;
  };
  'phone.editGroupCallParticipant': {
    params: {
      call: InputGroupCall;
      participant: InputPeer;
      muted?: boolean;
      volume?: number;
      raise_hand?: boolean;
      video_stopped?: boolean;
      video_paused?: boolean;
      presentation_paused?: boolean;
    };
    return: Updates;
  };
  'phone.editGroupCallTitle': {
    params: {
      call: InputGroupCall;
      title?: string;
    };
    return: Updates;
  };
  'phone.getGroupCallJoinAs': {
    params: {
      peer: InputPeer;
    };
    return: phone_JoinAsPeers;
  };
  'phone.exportGroupCallInvite': {
    params: {
      can_self_unmute?: boolean;
      call: InputGroupCall;
    };
    return: phone_ExportedGroupCallInvite;
  };
  'phone.toggleGroupCallStartSubscription': {
    params: {
      call: InputGroupCall;
      subscribed?: boolean;
    };
    return: Updates;
  };
  'phone.startScheduledGroupCall': {
    params: {
      call: InputGroupCall;
    };
    return: Updates;
  };
  'phone.saveDefaultGroupCallJoinAs': {
    params: {
      peer: InputPeer;
      join_as: InputPeer;
    };
    return: boolean;
  };
  'phone.joinGroupCallPresentation': {
    params: {
      call: InputGroupCall;
      params: DataJSON;
    };
    return: Updates;
  };
  'phone.leaveGroupCallPresentation': {
    params: {
      call: InputGroupCall;
    };
    return: Updates;
  };
  'stickers.checkShortName': {
    params: {
      short_name?: string;
    };
    return: boolean;
  };
  'stickers.suggestShortName': {
    params: {
      title?: string;
    };
    return: stickers_SuggestedShortName;
  };
  'bots.resetBotCommands': {
    params: {
      scope: BotCommandScope;
      lang_code?: string;
    };
    return: boolean;
  };
  'bots.getBotCommands': {
    params: {
      scope: BotCommandScope;
      lang_code?: string;
    };
    return: Array<BotCommand>;
  };
  'account.resetPassword': {
    params?: {};
    return: account_ResetPasswordResult;
  };
  'account.declinePasswordReset': {
    params?: {};
    return: boolean;
  };
  'auth.checkRecoveryPassword': {
    params: {
      code?: string;
    };
    return: boolean;
  };
  'account.getChatThemes': {
    params: {
      hash?: number;
    };
    return: account_Themes;
  };
  'messages.setChatTheme': {
    params: {
      peer: InputPeer;
      emoticon?: string;
    };
    return: Updates;
  };
  'channels.viewSponsoredMessage': {
    params: {
      channel: InputChannel;
      random_id?: Uint8Array;
    };
    return: boolean;
  };
  'channels.getSponsoredMessages': {
    params: {
      channel: InputChannel;
    };
    return: messages_SponsoredMessages;
  };
  'messages.getMessageReadParticipants': {
    params: {
      peer: InputPeer;
      msg_id?: number;
    };
    return: Array<ReadParticipantDate>;
  };
  'messages.getSearchResultsCalendar': {
    params: {
      peer: InputPeer;
      filter: MessagesFilter;
      offset_id?: number;
      offset_date?: number;
    };
    return: messages_SearchResultsCalendar;
  };
  'messages.getSearchResultsPositions': {
    params: {
      peer: InputPeer;
      filter: MessagesFilter;
      offset_id?: number;
      limit?: number;
    };
    return: messages_SearchResultsPositions;
  };
  'messages.hideChatJoinRequest': {
    params: {
      approved?: boolean;
      peer: InputPeer;
      user_id: InputUser;
    };
    return: Updates;
  };
  'messages.hideAllChatJoinRequests': {
    params: {
      approved?: boolean;
      peer: InputPeer;
      link?: string;
    };
    return: Updates;
  };
  'messages.toggleNoForwards': {
    params: {
      peer: InputPeer;
      enabled?: boolean;
    };
    return: Updates;
  };
  'messages.saveDefaultSendAs': {
    params: {
      peer: InputPeer;
      send_as: InputPeer;
    };
    return: boolean;
  };
  'channels.getSendAs': {
    params: {
      peer: InputPeer;
    };
    return: channels_SendAsPeers;
  };
  'account.setAuthorizationTTL': {
    params: {
      authorization_ttl_days?: number;
    };
    return: boolean;
  };
  'account.changeAuthorizationSettings': {
    params: {
      hash?: number;
      encrypted_requests_disabled?: boolean;
      call_requests_disabled?: boolean;
    };
    return: boolean;
  };
  'channels.deleteParticipantHistory': {
    params: {
      channel: InputChannel;
      participant: InputPeer;
    };
    return: messages_AffectedHistory;
  };
  'messages.sendReaction': {
    params: {
      big?: boolean;
      add_to_recent?: boolean;
      peer: InputPeer;
      msg_id?: number;
      reaction?: Array<Reaction>;
    };
    return: Updates;
  };
  'messages.getMessagesReactions': {
    params: {
      peer: InputPeer;
      id?: Array<number>;
    };
    return: Updates;
  };
  'messages.getMessageReactionsList': {
    params: {
      peer: InputPeer;
      id?: number;
      reaction?: Reaction;
      offset?: string;
      limit?: number;
    };
    return: messages_MessageReactionsList;
  };
  'messages.setChatAvailableReactions': {
    params: {
      peer: InputPeer;
      available_reactions: ChatReactions;
    };
    return: Updates;
  };
  'messages.getAvailableReactions': {
    params: {
      hash?: number;
    };
    return: messages_AvailableReactions;
  };
  'messages.setDefaultReaction': {
    params: {
      reaction: Reaction;
    };
    return: boolean;
  };
  'messages.translateText': {
    params: {
      peer?: InputPeer;
      id?: Array<number>;
      text?: Array<TextWithEntities>;
      to_lang?: string;
    };
    return: messages_TranslatedText;
  };
  'messages.getUnreadReactions': {
    params: {
      peer: InputPeer;
      top_msg_id?: number;
      offset_id?: number;
      add_offset?: number;
      limit?: number;
      max_id?: number;
      min_id?: number;
    };
    return: messages_Messages;
  };
  'messages.readReactions': {
    params: {
      peer: InputPeer;
      top_msg_id?: number;
    };
    return: messages_AffectedHistory;
  };
  'contacts.resolvePhone': {
    params: {
      phone?: string;
    };
    return: contacts_ResolvedPeer;
  };
  'phone.getGroupCallStreamChannels': {
    params: {
      call: InputGroupCall;
    };
    return: phone_GroupCallStreamChannels;
  };
  'phone.getGroupCallStreamRtmpUrl': {
    params: {
      peer: InputPeer;
      revoke?: boolean;
    };
    return: phone_GroupCallStreamRtmpUrl;
  };
  'messages.searchSentMedia': {
    params: {
      q?: string;
      filter: MessagesFilter;
      limit?: number;
    };
    return: messages_Messages;
  };
  'messages.getAttachMenuBots': {
    params: {
      hash?: number;
    };
    return: AttachMenuBots;
  };
  'messages.getAttachMenuBot': {
    params: {
      bot: InputUser;
    };
    return: AttachMenuBotsBot;
  };
  'messages.toggleBotInAttachMenu': {
    params: {
      write_allowed?: boolean;
      bot: InputUser;
      enabled?: boolean;
    };
    return: boolean;
  };
  'messages.requestWebView': {
    params: {
      from_bot_menu?: boolean;
      silent?: boolean;
      peer: InputPeer;
      bot: InputUser;
      url?: string;
      start_param?: string;
      theme_params?: DataJSON;
      platform?: string;
      reply_to_msg_id?: number;
      top_msg_id?: number;
      send_as?: InputPeer;
    };
    return: WebViewResult;
  };
  'messages.prolongWebView': {
    params: {
      silent?: boolean;
      peer: InputPeer;
      bot: InputUser;
      query_id?: number;
      reply_to_msg_id?: number;
      top_msg_id?: number;
      send_as?: InputPeer;
    };
    return: boolean;
  };
  'messages.requestSimpleWebView': {
    params: {
      from_switch_webview?: boolean;
      bot: InputUser;
      url?: string;
      theme_params?: DataJSON;
      platform?: string;
    };
    return: SimpleWebViewResult;
  };
  'messages.sendWebViewResultMessage': {
    params: {
      bot_query_id?: string;
      result: InputBotInlineResult;
    };
    return: WebViewMessageSent;
  };
  'messages.sendWebViewData': {
    params: {
      bot: InputUser;
      random_id?: number;
      button_text?: string;
      data?: string;
    };
    return: Updates;
  };
  'bots.setBotMenuButton': {
    params: {
      user_id: InputUser;
      button: BotMenuButton;
    };
    return: boolean;
  };
  'bots.getBotMenuButton': {
    params: {
      user_id: InputUser;
    };
    return: BotMenuButton;
  };
  'account.getSavedRingtones': {
    params: {
      hash?: number;
    };
    return: account_SavedRingtones;
  };
  'account.saveRingtone': {
    params: {
      id: InputDocument;
      unsave?: boolean;
    };
    return: account_SavedRingtone;
  };
  'account.uploadRingtone': {
    params: {
      file: InputFile;
      file_name?: string;
      mime_type?: string;
    };
    return: Document;
  };
  'bots.setBotBroadcastDefaultAdminRights': {
    params: {
      admin_rights: ChatAdminRights;
    };
    return: boolean;
  };
  'bots.setBotGroupDefaultAdminRights': {
    params: {
      admin_rights: ChatAdminRights;
    };
    return: boolean;
  };
  'phone.saveCallLog': {
    params: {
      peer: InputPhoneCall;
      file: InputFile;
    };
    return: boolean;
  };
  'channels.toggleJoinToSend': {
    params: {
      channel: InputChannel;
      enabled?: boolean;
    };
    return: Updates;
  };
  'channels.toggleJoinRequest': {
    params: {
      channel: InputChannel;
      enabled?: boolean;
    };
    return: Updates;
  };
  'payments.exportInvoice': {
    params: {
      invoice_media: InputMedia;
    };
    return: payments_ExportedInvoice;
  };
  'messages.transcribeAudio': {
    params: {
      peer: InputPeer;
      msg_id?: number;
    };
    return: messages_TranscribedAudio;
  };
  'messages.rateTranscribedAudio': {
    params: {
      peer: InputPeer;
      msg_id?: number;
      transcription_id?: number;
      good?: boolean;
    };
    return: boolean;
  };
  'payments.assignAppStoreTransaction': {
    params: {
      receipt?: Uint8Array;
      purpose: InputStorePaymentPurpose;
    };
    return: Updates;
  };
  'payments.assignPlayMarketTransaction': {
    params: {
      receipt: DataJSON;
      purpose: InputStorePaymentPurpose;
    };
    return: Updates;
  };
  'payments.canPurchasePremium': {
    params: {
      purpose: InputStorePaymentPurpose;
    };
    return: boolean;
  };
  'help.getPremiumPromo': {
    params?: {};
    return: help_PremiumPromo;
  };
  'messages.getCustomEmojiDocuments': {
    params: {
      document_id?: Array<number>;
    };
    return: Array<Document>;
  };
  'messages.getEmojiStickers': {
    params: {
      hash?: number;
    };
    return: messages_AllStickers;
  };
  'messages.getFeaturedEmojiStickers': {
    params: {
      hash?: number;
    };
    return: messages_FeaturedStickers;
  };
  'account.updateEmojiStatus': {
    params: {
      emoji_status: EmojiStatus;
    };
    return: boolean;
  };
  'account.getDefaultEmojiStatuses': {
    params: {
      hash?: number;
    };
    return: account_EmojiStatuses;
  };
  'account.getRecentEmojiStatuses': {
    params: {
      hash?: number;
    };
    return: account_EmojiStatuses;
  };
  'account.clearRecentEmojiStatuses': {
    params?: {};
    return: boolean;
  };
  'messages.reportReaction': {
    params: {
      peer: InputPeer;
      id?: number;
      reaction_peer: InputPeer;
    };
    return: boolean;
  };
  'messages.getTopReactions': {
    params: {
      limit?: number;
      hash?: number;
    };
    return: messages_Reactions;
  };
  'messages.getRecentReactions': {
    params: {
      limit?: number;
      hash?: number;
    };
    return: messages_Reactions;
  };
  'messages.clearRecentReactions': {
    params?: {};
    return: boolean;
  };
  'messages.getExtendedMedia': {
    params: {
      peer: InputPeer;
      id?: Array<number>;
    };
    return: Updates;
  };
  'auth.importWebTokenAuthorization': {
    params: {
      api_id?: number;
      api_hash?: string;
      web_auth_token?: string;
    };
    return: auth_Authorization;
  };
  'account.reorderUsernames': {
    params: {
      order?: Array<string>;
    };
    return: boolean;
  };
  'account.toggleUsername': {
    params: {
      username?: string;
      active?: boolean;
    };
    return: boolean;
  };
  'channels.reorderUsernames': {
    params: {
      channel: InputChannel;
      order?: Array<string>;
    };
    return: boolean;
  };
  'channels.toggleUsername': {
    params: {
      channel: InputChannel;
      username?: string;
      active?: boolean;
    };
    return: boolean;
  };
  'channels.deactivateAllUsernames': {
    params: {
      channel: InputChannel;
    };
    return: boolean;
  };
  'channels.toggleForum': {
    params: {
      channel: InputChannel;
      enabled?: boolean;
    };
    return: Updates;
  };
  'channels.createForumTopic': {
    params: {
      channel: InputChannel;
      title?: string;
      icon_color?: number;
      icon_emoji_id?: number;
      random_id?: number;
      send_as?: InputPeer;
    };
    return: Updates;
  };
  'channels.getForumTopics': {
    params: {
      channel: InputChannel;
      q?: string;
      offset_date?: number;
      offset_id?: number;
      offset_topic?: number;
      limit?: number;
    };
    return: messages_ForumTopics;
  };
  'channels.getForumTopicsByID': {
    params: {
      channel: InputChannel;
      topics?: Array<number>;
    };
    return: messages_ForumTopics;
  };
  'channels.editForumTopic': {
    params: {
      channel: InputChannel;
      topic_id?: number;
      title?: string;
      icon_emoji_id?: number;
      closed?: boolean;
      hidden?: boolean;
    };
    return: Updates;
  };
  'channels.updatePinnedForumTopic': {
    params: {
      channel: InputChannel;
      topic_id?: number;
      pinned?: boolean;
    };
    return: Updates;
  };
  'channels.deleteTopicHistory': {
    params: {
      channel: InputChannel;
      top_msg_id?: number;
    };
    return: messages_AffectedHistory;
  };
  'channels.reorderPinnedForumTopics': {
    params: {
      force?: boolean;
      channel: InputChannel;
      order?: Array<number>;
    };
    return: Updates;
  };
  'channels.toggleAntiSpam': {
    params: {
      channel: InputChannel;
      enabled?: boolean;
    };
    return: Updates;
  };
  'channels.reportAntiSpamFalsePositive': {
    params: {
      channel: InputChannel;
      msg_id?: number;
    };
    return: boolean;
  };
  'messages.setDefaultHistoryTTL': {
    params: {
      period?: number;
    };
    return: boolean;
  };
  'messages.getDefaultHistoryTTL': {
    params?: {};
    return: DefaultHistoryTTL;
  };
  'contacts.exportContactToken': {
    params?: {};
    return: ExportedContactToken;
  };
  'contacts.importContactToken': {
    params: {
      token?: string;
    };
    return: User;
  };
  'photos.uploadContactProfilePhoto': {
    params: {
      suggest?: boolean;
      save?: boolean;
      user_id: InputUser;
      file?: InputFile;
      video?: InputFile;
      video_start_ts?: number;
      video_emoji_markup?: VideoSize;
    };
    return: photos_Photo;
  };
  'channels.toggleParticipantsHidden': {
    params: {
      channel: InputChannel;
      enabled?: boolean;
    };
    return: Updates;
  };
  'messages.sendBotRequestedPeer': {
    params: {
      peer: InputPeer;
      msg_id?: number;
      button_id?: number;
      requested_peer: InputPeer;
    };
    return: Updates;
  };
  'account.getDefaultProfilePhotoEmojis': {
    params: {
      hash?: number;
    };
    return: EmojiList;
  };
  'account.getDefaultGroupPhotoEmojis': {
    params: {
      hash?: number;
    };
    return: EmojiList;
  };
  'auth.requestFirebaseSms': {
    params: {
      phone_number?: string;
      phone_code_hash?: string;
      safety_net_token?: string;
      ios_push_secret?: string;
    };
    return: boolean;
  };
  'messages.getEmojiGroups': {
    params: {
      hash?: number;
    };
    return: messages_EmojiGroups;
  };
  'messages.getEmojiStatusGroups': {
    params: {
      hash?: number;
    };
    return: messages_EmojiGroups;
  };
  'messages.getEmojiProfilePhotoGroups': {
    params: {
      hash?: number;
    };
    return: messages_EmojiGroups;
  };
  'messages.searchCustomEmoji': {
    params: {
      emoticon?: string;
      hash?: number;
    };
    return: EmojiList;
  };
  'messages.togglePeerTranslations': {
    params: {
      disabled?: boolean;
      peer: InputPeer;
    };
    return: boolean;
  };
  'account.getAutoSaveSettings': {
    params?: {};
    return: account_AutoSaveSettings;
  };
  'account.saveAutoSaveSettings': {
    params: {
      users?: boolean;
      chats?: boolean;
      broadcasts?: boolean;
      peer?: InputPeer;
      settings: AutoSaveSettings;
    };
    return: boolean;
  };
  'account.deleteAutoSaveExceptions': {
    params?: {};
    return: boolean;
  };
  'stickers.changeSticker': {
    params: {
      sticker: InputDocument;
      emoji?: string;
      mask_coords?: MaskCoords;
      keywords?: string;
    };
    return: messages_StickerSet;
  };
  'stickers.renameStickerSet': {
    params: {
      stickerset: InputStickerSet;
      title?: string;
    };
    return: messages_StickerSet;
  };
  'stickers.deleteStickerSet': {
    params: {
      stickerset: InputStickerSet;
    };
    return: boolean;
  };
  'messages.getBotApp': {
    params: {
      app: InputBotApp;
      hash?: number;
    };
    return: messages_BotApp;
  };
  'messages.requestAppWebView': {
    params: {
      write_allowed?: boolean;
      peer: InputPeer;
      app: InputBotApp;
      start_param?: string;
      theme_params?: DataJSON;
      platform?: string;
    };
    return: AppWebViewResult;
  };
  'bots.setBotInfo': {
    params: {
      bot?: InputUser;
      lang_code?: string;
      name?: string;
      about?: string;
      description?: string;
    };
    return: boolean;
  };
  'bots.getBotInfo': {
    params: {
      bot?: InputUser;
      lang_code?: string;
    };
    return: bots_BotInfo;
  };
  'auth.resetLoginEmail': {
    params: {
      phone_number?: string;
      phone_code_hash?: string;
    };
    return: auth_SentCode;
  };
  'chatlists.exportChatlistInvite': {
    params: {
      chatlist: InputChatlist;
      title?: string;
      peers: Array<InputPeer>;
    };
    return: chatlists_ExportedChatlistInvite;
  };
  'chatlists.deleteExportedInvite': {
    params: {
      chatlist: InputChatlist;
      slug?: string;
    };
    return: boolean;
  };
  'chatlists.editExportedInvite': {
    params: {
      chatlist: InputChatlist;
      slug?: string;
      title?: string;
      peers?: Array<InputPeer>;
    };
    return: ExportedChatlistInvite;
  };
  'chatlists.getExportedInvites': {
    params: {
      chatlist: InputChatlist;
    };
    return: chatlists_ExportedInvites;
  };
  'chatlists.checkChatlistInvite': {
    params: {
      slug?: string;
    };
    return: chatlists_ChatlistInvite;
  };
  'chatlists.joinChatlistInvite': {
    params: {
      slug?: string;
      peers: Array<InputPeer>;
    };
    return: Updates;
  };
  'chatlists.getChatlistUpdates': {
    params: {
      chatlist: InputChatlist;
    };
    return: chatlists_ChatlistUpdates;
  };
  'chatlists.joinChatlistUpdates': {
    params: {
      chatlist: InputChatlist;
      peers: Array<InputPeer>;
    };
    return: Updates;
  };
  'chatlists.hideChatlistUpdates': {
    params: {
      chatlist: InputChatlist;
    };
    return: boolean;
  };
  'chatlists.getLeaveChatlistSuggestions': {
    params: {
      chatlist: InputChatlist;
    };
    return: Array<Peer>;
  };
  'chatlists.leaveChatlist': {
    params: {
      chatlist: InputChatlist;
      peers: Array<InputPeer>;
    };
    return: Updates;
  };
  'bots.reorderUsernames': {
    params: {
      bot: InputUser;
      order?: Array<string>;
    };
    return: boolean;
  };
  'bots.toggleUsername': {
    params: {
      bot: InputUser;
      username?: string;
      active?: boolean;
    };
    return: boolean;
  };
  'messages.setChatWallPaper': {
    params: {
      peer: InputPeer;
      wallpaper?: InputWallPaper;
      settings?: WallPaperSettings;
      id?: number;
    };
    return: Updates;
  };
};

export type error = {
  _: 'error';
  code?: number;
  text?: string;
};
export type Error = error;

export type inputPeerEmpty = {
  _: 'inputPeerEmpty';
};
export type inputPeerSelf = {
  _: 'inputPeerSelf';
};
export type inputPeerChat = {
  _: 'inputPeerChat';
  chat_id?: number;
};
export type inputPeerUser = {
  _: 'inputPeerUser';
  user_id?: number;
  access_hash?: number;
};
export type inputPeerChannel = {
  _: 'inputPeerChannel';
  channel_id?: number;
  access_hash?: number;
};
export type inputPeerUserFromMessage = {
  _: 'inputPeerUserFromMessage';
  peer: InputPeer;
  msg_id?: number;
  user_id?: number;
};
export type inputPeerChannelFromMessage = {
  _: 'inputPeerChannelFromMessage';
  peer: InputPeer;
  msg_id?: number;
  channel_id?: number;
};
export type InputPeer = inputPeerEmpty | inputPeerSelf | inputPeerChat | inputPeerUser | inputPeerChannel | inputPeerUserFromMessage | inputPeerChannelFromMessage;

export type inputUserEmpty = {
  _: 'inputUserEmpty';
};
export type inputUserSelf = {
  _: 'inputUserSelf';
};
export type inputUser = {
  _: 'inputUser';
  user_id?: number;
  access_hash?: number;
};
export type inputUserFromMessage = {
  _: 'inputUserFromMessage';
  peer: InputPeer;
  msg_id?: number;
  user_id?: number;
};
export type InputUser = inputUserEmpty | inputUserSelf | inputUser | inputUserFromMessage;

export type inputPhoneContact = {
  _: 'inputPhoneContact';
  client_id?: number;
  phone?: string;
  first_name?: string;
  last_name?: string;
};
export type InputContact = inputPhoneContact;

export type inputFile = {
  _: 'inputFile';
  id?: number;
  parts?: number;
  name?: string;
  md5_checksum?: string;
};
export type inputFileBig = {
  _: 'inputFileBig';
  id?: number;
  parts?: number;
  name?: string;
};
export type InputFile = inputFile | inputFileBig;

export type inputMediaEmpty = {
  _: 'inputMediaEmpty';
};
export type inputMediaUploadedPhoto = {
  _: 'inputMediaUploadedPhoto';
  flags?: number;
  spoiler?: boolean;
  file: InputFile;
  stickers?: Array<InputDocument>;
  ttl_seconds?: number;
};
export type inputMediaPhoto = {
  _: 'inputMediaPhoto';
  flags?: number;
  spoiler?: boolean;
  id: InputPhoto;
  ttl_seconds?: number;
};
export type inputMediaGeoPoint = {
  _: 'inputMediaGeoPoint';
  geo_point: InputGeoPoint;
};
export type inputMediaContact = {
  _: 'inputMediaContact';
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  vcard?: string;
};
export type inputMediaUploadedDocument = {
  _: 'inputMediaUploadedDocument';
  flags?: number;
  nosound_video?: boolean;
  force_file?: boolean;
  spoiler?: boolean;
  file: InputFile;
  thumb?: InputFile;
  mime_type?: string;
  attributes: Array<DocumentAttribute>;
  stickers?: Array<InputDocument>;
  ttl_seconds?: number;
};
export type inputMediaDocument = {
  _: 'inputMediaDocument';
  flags?: number;
  spoiler?: boolean;
  id: InputDocument;
  ttl_seconds?: number;
  query?: string;
};
export type inputMediaVenue = {
  _: 'inputMediaVenue';
  geo_point: InputGeoPoint;
  title?: string;
  address?: string;
  provider?: string;
  venue_id?: string;
  venue_type?: string;
};
export type inputMediaPhotoExternal = {
  _: 'inputMediaPhotoExternal';
  flags?: number;
  spoiler?: boolean;
  url?: string;
  ttl_seconds?: number;
};
export type inputMediaDocumentExternal = {
  _: 'inputMediaDocumentExternal';
  flags?: number;
  spoiler?: boolean;
  url?: string;
  ttl_seconds?: number;
};
export type inputMediaGame = {
  _: 'inputMediaGame';
  id: InputGame;
};
export type inputMediaInvoice = {
  _: 'inputMediaInvoice';
  flags?: number;
  title?: string;
  description?: string;
  photo?: InputWebDocument;
  invoice: Invoice;
  payload?: Uint8Array;
  provider?: string;
  provider_data: DataJSON;
  start_param?: string;
  extended_media?: InputMedia;
};
export type inputMediaGeoLive = {
  _: 'inputMediaGeoLive';
  flags?: number;
  stopped?: boolean;
  geo_point: InputGeoPoint;
  heading?: number;
  period?: number;
  proximity_notification_radius?: number;
};
export type inputMediaPoll = {
  _: 'inputMediaPoll';
  flags?: number;
  poll: Poll;
  correct_answers?: Array<Uint8Array>;
  solution?: string;
  solution_entities?: Array<MessageEntity>;
};
export type inputMediaDice = {
  _: 'inputMediaDice';
  emoticon?: string;
};
export type InputMedia = inputMediaEmpty | inputMediaUploadedPhoto | inputMediaPhoto | inputMediaGeoPoint | inputMediaContact | inputMediaUploadedDocument | inputMediaDocument | inputMediaVenue | inputMediaPhotoExternal | inputMediaDocumentExternal | inputMediaGame | inputMediaInvoice | inputMediaGeoLive | inputMediaPoll | inputMediaDice;

export type inputChatPhotoEmpty = {
  _: 'inputChatPhotoEmpty';
};
export type inputChatUploadedPhoto = {
  _: 'inputChatUploadedPhoto';
  flags?: number;
  file?: InputFile;
  video?: InputFile;
  video_start_ts?: number;
  video_emoji_markup?: VideoSize;
};
export type inputChatPhoto = {
  _: 'inputChatPhoto';
  id: InputPhoto;
};
export type InputChatPhoto = inputChatPhotoEmpty | inputChatUploadedPhoto | inputChatPhoto;

export type inputGeoPointEmpty = {
  _: 'inputGeoPointEmpty';
};
export type inputGeoPoint = {
  _: 'inputGeoPoint';
  flags?: number;
  lat?: number;
  long?: number;
  accuracy_radius?: number;
};
export type InputGeoPoint = inputGeoPointEmpty | inputGeoPoint;

export type inputPhotoEmpty = {
  _: 'inputPhotoEmpty';
};
export type inputPhoto = {
  _: 'inputPhoto';
  id?: number;
  access_hash?: number;
  file_reference?: Uint8Array;
};
export type InputPhoto = inputPhotoEmpty | inputPhoto;

export type inputFileLocation = {
  _: 'inputFileLocation';
  volume_id?: number;
  local_id?: number;
  secret?: number;
  file_reference?: Uint8Array;
};
export type inputEncryptedFileLocation = {
  _: 'inputEncryptedFileLocation';
  id?: number;
  access_hash?: number;
};
export type inputDocumentFileLocation = {
  _: 'inputDocumentFileLocation';
  id?: number;
  access_hash?: number;
  file_reference?: Uint8Array;
  thumb_size?: string;
};
export type inputSecureFileLocation = {
  _: 'inputSecureFileLocation';
  id?: number;
  access_hash?: number;
};
export type inputTakeoutFileLocation = {
  _: 'inputTakeoutFileLocation';
};
export type inputPhotoFileLocation = {
  _: 'inputPhotoFileLocation';
  id?: number;
  access_hash?: number;
  file_reference?: Uint8Array;
  thumb_size?: string;
};
export type inputPhotoLegacyFileLocation = {
  _: 'inputPhotoLegacyFileLocation';
  id?: number;
  access_hash?: number;
  file_reference?: Uint8Array;
  volume_id?: number;
  local_id?: number;
  secret?: number;
};
export type inputPeerPhotoFileLocation = {
  _: 'inputPeerPhotoFileLocation';
  flags?: number;
  big?: boolean;
  peer: InputPeer;
  photo_id?: number;
};
export type inputStickerSetThumb = {
  _: 'inputStickerSetThumb';
  stickerset: InputStickerSet;
  thumb_version?: number;
};
export type inputGroupCallStream = {
  _: 'inputGroupCallStream';
  flags?: number;
  call: InputGroupCall;
  time_ms?: number;
  scale?: number;
  video_channel?: number;
  video_quality?: number;
};
export type InputFileLocation = inputFileLocation | inputEncryptedFileLocation | inputDocumentFileLocation | inputSecureFileLocation | inputTakeoutFileLocation | inputPhotoFileLocation | inputPhotoLegacyFileLocation | inputPeerPhotoFileLocation | inputStickerSetThumb | inputGroupCallStream;

export type peerUser = {
  _: 'peerUser';
  user_id?: number;
};
export type peerChat = {
  _: 'peerChat';
  chat_id?: number;
};
export type peerChannel = {
  _: 'peerChannel';
  channel_id?: number;
};
export type Peer = peerUser | peerChat | peerChannel;

export type storage_fileUnknown = {
  _: 'storage.fileUnknown';
};
export type storage_filePartial = {
  _: 'storage.filePartial';
};
export type storage_fileJpeg = {
  _: 'storage.fileJpeg';
};
export type storage_fileGif = {
  _: 'storage.fileGif';
};
export type storage_filePng = {
  _: 'storage.filePng';
};
export type storage_filePdf = {
  _: 'storage.filePdf';
};
export type storage_fileMp3 = {
  _: 'storage.fileMp3';
};
export type storage_fileMov = {
  _: 'storage.fileMov';
};
export type storage_fileMp4 = {
  _: 'storage.fileMp4';
};
export type storage_fileWebp = {
  _: 'storage.fileWebp';
};
export type storage_FileType = storage_fileUnknown | storage_filePartial | storage_fileJpeg | storage_fileGif | storage_filePng | storage_filePdf | storage_fileMp3 | storage_fileMov | storage_fileMp4 | storage_fileWebp;

export type userEmpty = {
  _: 'userEmpty';
  id?: number;
};
export type user = {
  _: 'user';
  flags?: number;
  self?: boolean;
  contact?: boolean;
  mutual_contact?: boolean;
  deleted?: boolean;
  bot?: boolean;
  bot_chat_history?: boolean;
  bot_nochats?: boolean;
  verified?: boolean;
  restricted?: boolean;
  min?: boolean;
  bot_inline_geo?: boolean;
  support?: boolean;
  scam?: boolean;
  apply_min_photo?: boolean;
  fake?: boolean;
  bot_attach_menu?: boolean;
  premium?: boolean;
  attach_menu_enabled?: boolean;
  flags2?: number;
  bot_can_edit?: boolean;
  id?: number;
  access_hash?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  photo?: UserProfilePhoto;
  status?: UserStatus;
  bot_info_version?: number;
  restriction_reason?: Array<RestrictionReason>;
  bot_inline_placeholder?: string;
  lang_code?: string;
  emoji_status?: EmojiStatus;
  usernames?: Array<Username>;
};
export type User = userEmpty | user;

export type userProfilePhotoEmpty = {
  _: 'userProfilePhotoEmpty';
};
export type userProfilePhoto = {
  _: 'userProfilePhoto';
  flags?: number;
  has_video?: boolean;
  personal?: boolean;
  photo_id?: number;
  stripped_thumb?: Uint8Array;
  dc_id?: number;
};
export type UserProfilePhoto = userProfilePhotoEmpty | userProfilePhoto;

export type userStatusEmpty = {
  _: 'userStatusEmpty';
};
export type userStatusOnline = {
  _: 'userStatusOnline';
  expires?: number;
};
export type userStatusOffline = {
  _: 'userStatusOffline';
  was_online?: number;
};
export type userStatusRecently = {
  _: 'userStatusRecently';
};
export type userStatusLastWeek = {
  _: 'userStatusLastWeek';
};
export type userStatusLastMonth = {
  _: 'userStatusLastMonth';
};
export type UserStatus = userStatusEmpty | userStatusOnline | userStatusOffline | userStatusRecently | userStatusLastWeek | userStatusLastMonth;

export type chatEmpty = {
  _: 'chatEmpty';
  id?: number;
};
export type chat = {
  _: 'chat';
  flags?: number;
  creator?: boolean;
  left?: boolean;
  deactivated?: boolean;
  call_active?: boolean;
  call_not_empty?: boolean;
  noforwards?: boolean;
  id?: number;
  title?: string;
  photo: ChatPhoto;
  participants_count?: number;
  date?: number;
  version?: number;
  migrated_to?: InputChannel;
  admin_rights?: ChatAdminRights;
  default_banned_rights?: ChatBannedRights;
};
export type chatForbidden = {
  _: 'chatForbidden';
  id?: number;
  title?: string;
};
export type channel = {
  _: 'channel';
  flags?: number;
  creator?: boolean;
  left?: boolean;
  broadcast?: boolean;
  verified?: boolean;
  megagroup?: boolean;
  restricted?: boolean;
  signatures?: boolean;
  min?: boolean;
  scam?: boolean;
  has_link?: boolean;
  has_geo?: boolean;
  slowmode_enabled?: boolean;
  call_active?: boolean;
  call_not_empty?: boolean;
  fake?: boolean;
  gigagroup?: boolean;
  noforwards?: boolean;
  join_to_send?: boolean;
  join_request?: boolean;
  forum?: boolean;
  flags2?: number;
  id?: number;
  access_hash?: number;
  title?: string;
  username?: string;
  photo: ChatPhoto;
  date?: number;
  restriction_reason?: Array<RestrictionReason>;
  admin_rights?: ChatAdminRights;
  banned_rights?: ChatBannedRights;
  default_banned_rights?: ChatBannedRights;
  participants_count?: number;
  usernames?: Array<Username>;
};
export type channelForbidden = {
  _: 'channelForbidden';
  flags?: number;
  broadcast?: boolean;
  megagroup?: boolean;
  id?: number;
  access_hash?: number;
  title?: string;
  until_date?: number;
};
export type Chat = chatEmpty | chat | chatForbidden | channel | channelForbidden;

export type chatFull = {
  _: 'chatFull';
  flags?: number;
  can_set_username?: boolean;
  has_scheduled?: boolean;
  translations_disabled?: boolean;
  id?: number;
  about?: string;
  participants: ChatParticipants;
  chat_photo?: Photo;
  notify_settings: PeerNotifySettings;
  exported_invite?: ExportedChatInvite;
  bot_info?: Array<BotInfo>;
  pinned_msg_id?: number;
  folder_id?: number;
  call?: InputGroupCall;
  ttl_period?: number;
  groupcall_default_join_as?: Peer;
  theme_emoticon?: string;
  requests_pending?: number;
  recent_requesters?: Array<number>;
  available_reactions?: ChatReactions;
};
export type channelFull = {
  _: 'channelFull';
  flags?: number;
  can_view_participants?: boolean;
  can_set_username?: boolean;
  can_set_stickers?: boolean;
  hidden_prehistory?: boolean;
  can_set_location?: boolean;
  has_scheduled?: boolean;
  can_view_stats?: boolean;
  blocked?: boolean;
  flags2?: number;
  can_delete_channel?: boolean;
  antispam?: boolean;
  participants_hidden?: boolean;
  translations_disabled?: boolean;
  id?: number;
  about?: string;
  participants_count?: number;
  admins_count?: number;
  kicked_count?: number;
  banned_count?: number;
  online_count?: number;
  read_inbox_max_id?: number;
  read_outbox_max_id?: number;
  unread_count?: number;
  chat_photo: Photo;
  notify_settings: PeerNotifySettings;
  exported_invite?: ExportedChatInvite;
  bot_info: Array<BotInfo>;
  migrated_from_chat_id?: number;
  migrated_from_max_id?: number;
  pinned_msg_id?: number;
  stickerset?: StickerSet;
  available_min_id?: number;
  folder_id?: number;
  linked_chat_id?: number;
  location?: ChannelLocation;
  slowmode_seconds?: number;
  slowmode_next_send_date?: number;
  stats_dc?: number;
  pts?: number;
  call?: InputGroupCall;
  ttl_period?: number;
  pending_suggestions?: Array<string>;
  groupcall_default_join_as?: Peer;
  theme_emoticon?: string;
  requests_pending?: number;
  recent_requesters?: Array<number>;
  default_send_as?: Peer;
  available_reactions?: ChatReactions;
};
export type ChatFull = chatFull | channelFull;

export type chatParticipant = {
  _: 'chatParticipant';
  user_id?: number;
  inviter_id?: number;
  date?: number;
};
export type chatParticipantCreator = {
  _: 'chatParticipantCreator';
  user_id?: number;
};
export type chatParticipantAdmin = {
  _: 'chatParticipantAdmin';
  user_id?: number;
  inviter_id?: number;
  date?: number;
};
export type ChatParticipant = chatParticipant | chatParticipantCreator | chatParticipantAdmin;

export type chatParticipantsForbidden = {
  _: 'chatParticipantsForbidden';
  flags?: number;
  chat_id?: number;
  self_participant?: ChatParticipant;
};
export type chatParticipants = {
  _: 'chatParticipants';
  chat_id?: number;
  participants: Array<ChatParticipant>;
  version?: number;
};
export type ChatParticipants = chatParticipantsForbidden | chatParticipants;

export type chatPhotoEmpty = {
  _: 'chatPhotoEmpty';
};
export type chatPhoto = {
  _: 'chatPhoto';
  flags?: number;
  has_video?: boolean;
  photo_id?: number;
  stripped_thumb?: Uint8Array;
  dc_id?: number;
};
export type ChatPhoto = chatPhotoEmpty | chatPhoto;

export type messageEmpty = {
  _: 'messageEmpty';
  flags?: number;
  id?: number;
  peer_id?: Peer;
};
export type message = {
  _: 'message';
  flags?: number;
  out?: boolean;
  mentioned?: boolean;
  media_unread?: boolean;
  silent?: boolean;
  post?: boolean;
  from_scheduled?: boolean;
  legacy?: boolean;
  edit_hide?: boolean;
  pinned?: boolean;
  noforwards?: boolean;
  id?: number;
  from_id?: Peer;
  peer_id: Peer;
  fwd_from?: MessageFwdHeader;
  via_bot_id?: number;
  reply_to?: MessageReplyHeader;
  date?: number;
  message?: string;
  media?: MessageMedia;
  reply_markup?: ReplyMarkup;
  entities?: Array<MessageEntity>;
  views?: number;
  forwards?: number;
  replies?: MessageReplies;
  edit_date?: number;
  post_author?: string;
  grouped_id?: number;
  reactions?: MessageReactions;
  restriction_reason?: Array<RestrictionReason>;
  ttl_period?: number;
};
export type messageService = {
  _: 'messageService';
  flags?: number;
  out?: boolean;
  mentioned?: boolean;
  media_unread?: boolean;
  silent?: boolean;
  post?: boolean;
  legacy?: boolean;
  id?: number;
  from_id?: Peer;
  peer_id: Peer;
  reply_to?: MessageReplyHeader;
  date?: number;
  action: MessageAction;
  ttl_period?: number;
};
export type Message = messageEmpty | message | messageService;

export type messageMediaEmpty = {
  _: 'messageMediaEmpty';
};
export type messageMediaPhoto = {
  _: 'messageMediaPhoto';
  flags?: number;
  spoiler?: boolean;
  photo?: Photo;
  ttl_seconds?: number;
};
export type messageMediaGeo = {
  _: 'messageMediaGeo';
  geo: GeoPoint;
};
export type messageMediaContact = {
  _: 'messageMediaContact';
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  vcard?: string;
  user_id?: number;
};
export type messageMediaUnsupported = {
  _: 'messageMediaUnsupported';
};
export type messageMediaDocument = {
  _: 'messageMediaDocument';
  flags?: number;
  nopremium?: boolean;
  spoiler?: boolean;
  document?: Document;
  ttl_seconds?: number;
};
export type messageMediaWebPage = {
  _: 'messageMediaWebPage';
  webpage: WebPage;
};
export type messageMediaVenue = {
  _: 'messageMediaVenue';
  geo: GeoPoint;
  title?: string;
  address?: string;
  provider?: string;
  venue_id?: string;
  venue_type?: string;
};
export type messageMediaGame = {
  _: 'messageMediaGame';
  game: Game;
};
export type messageMediaInvoice = {
  _: 'messageMediaInvoice';
  flags?: number;
  shipping_address_requested?: boolean;
  test?: boolean;
  title?: string;
  description?: string;
  photo?: WebDocument;
  receipt_msg_id?: number;
  currency?: string;
  total_amount?: number;
  start_param?: string;
  extended_media?: MessageExtendedMedia;
};
export type messageMediaGeoLive = {
  _: 'messageMediaGeoLive';
  flags?: number;
  geo: GeoPoint;
  heading?: number;
  period?: number;
  proximity_notification_radius?: number;
};
export type messageMediaPoll = {
  _: 'messageMediaPoll';
  poll: Poll;
  results: PollResults;
};
export type messageMediaDice = {
  _: 'messageMediaDice';
  value?: number;
  emoticon?: string;
};
export type MessageMedia = messageMediaEmpty | messageMediaPhoto | messageMediaGeo | messageMediaContact | messageMediaUnsupported | messageMediaDocument | messageMediaWebPage | messageMediaVenue | messageMediaGame | messageMediaInvoice | messageMediaGeoLive | messageMediaPoll | messageMediaDice;

export type messageActionEmpty = {
  _: 'messageActionEmpty';
};
export type messageActionChatCreate = {
  _: 'messageActionChatCreate';
  title?: string;
  users?: Array<number>;
};
export type messageActionChatEditTitle = {
  _: 'messageActionChatEditTitle';
  title?: string;
};
export type messageActionChatEditPhoto = {
  _: 'messageActionChatEditPhoto';
  photo: Photo;
};
export type messageActionChatDeletePhoto = {
  _: 'messageActionChatDeletePhoto';
};
export type messageActionChatAddUser = {
  _: 'messageActionChatAddUser';
  users?: Array<number>;
};
export type messageActionChatDeleteUser = {
  _: 'messageActionChatDeleteUser';
  user_id?: number;
};
export type messageActionChatJoinedByLink = {
  _: 'messageActionChatJoinedByLink';
  inviter_id?: number;
};
export type messageActionChannelCreate = {
  _: 'messageActionChannelCreate';
  title?: string;
};
export type messageActionChatMigrateTo = {
  _: 'messageActionChatMigrateTo';
  channel_id?: number;
};
export type messageActionChannelMigrateFrom = {
  _: 'messageActionChannelMigrateFrom';
  title?: string;
  chat_id?: number;
};
export type messageActionPinMessage = {
  _: 'messageActionPinMessage';
};
export type messageActionHistoryClear = {
  _: 'messageActionHistoryClear';
};
export type messageActionGameScore = {
  _: 'messageActionGameScore';
  game_id?: number;
  score?: number;
};
export type messageActionPaymentSentMe = {
  _: 'messageActionPaymentSentMe';
  flags?: number;
  recurring_init?: boolean;
  recurring_used?: boolean;
  currency?: string;
  total_amount?: number;
  payload?: Uint8Array;
  info?: PaymentRequestedInfo;
  shipping_option_id?: string;
  charge: PaymentCharge;
};
export type messageActionPaymentSent = {
  _: 'messageActionPaymentSent';
  flags?: number;
  recurring_init?: boolean;
  recurring_used?: boolean;
  currency?: string;
  total_amount?: number;
  invoice_slug?: string;
};
export type messageActionPhoneCall = {
  _: 'messageActionPhoneCall';
  flags?: number;
  video?: boolean;
  call_id?: number;
  reason?: PhoneCallDiscardReason;
  duration?: number;
};
export type messageActionScreenshotTaken = {
  _: 'messageActionScreenshotTaken';
};
export type messageActionCustomAction = {
  _: 'messageActionCustomAction';
  message?: string;
};
export type messageActionBotAllowed = {
  _: 'messageActionBotAllowed';
  flags?: number;
  attach_menu?: boolean;
  domain?: string;
  app?: BotApp;
};
export type messageActionSecureValuesSentMe = {
  _: 'messageActionSecureValuesSentMe';
  values: Array<SecureValue>;
  credentials: SecureCredentialsEncrypted;
};
export type messageActionSecureValuesSent = {
  _: 'messageActionSecureValuesSent';
  types: Array<SecureValueType>;
};
export type messageActionContactSignUp = {
  _: 'messageActionContactSignUp';
};
export type messageActionGeoProximityReached = {
  _: 'messageActionGeoProximityReached';
  from_id: Peer;
  to_id: Peer;
  distance?: number;
};
export type messageActionGroupCall = {
  _: 'messageActionGroupCall';
  flags?: number;
  call: InputGroupCall;
  duration?: number;
};
export type messageActionInviteToGroupCall = {
  _: 'messageActionInviteToGroupCall';
  call: InputGroupCall;
  users?: Array<number>;
};
export type messageActionSetMessagesTTL = {
  _: 'messageActionSetMessagesTTL';
  flags?: number;
  period?: number;
  auto_setting_from?: number;
};
export type messageActionGroupCallScheduled = {
  _: 'messageActionGroupCallScheduled';
  call: InputGroupCall;
  schedule_date?: number;
};
export type messageActionSetChatTheme = {
  _: 'messageActionSetChatTheme';
  emoticon?: string;
};
export type messageActionChatJoinedByRequest = {
  _: 'messageActionChatJoinedByRequest';
};
export type messageActionWebViewDataSentMe = {
  _: 'messageActionWebViewDataSentMe';
  text?: string;
  data?: string;
};
export type messageActionWebViewDataSent = {
  _: 'messageActionWebViewDataSent';
  text?: string;
};
export type messageActionGiftPremium = {
  _: 'messageActionGiftPremium';
  flags?: number;
  currency?: string;
  amount?: number;
  months?: number;
  crypto_currency?: string;
  crypto_amount?: number;
};
export type messageActionTopicCreate = {
  _: 'messageActionTopicCreate';
  flags?: number;
  title?: string;
  icon_color?: number;
  icon_emoji_id?: number;
};
export type messageActionTopicEdit = {
  _: 'messageActionTopicEdit';
  flags?: number;
  title?: string;
  icon_emoji_id?: number;
  closed?: boolean;
  hidden?: boolean;
};
export type messageActionSuggestProfilePhoto = {
  _: 'messageActionSuggestProfilePhoto';
  photo: Photo;
};
export type messageActionRequestedPeer = {
  _: 'messageActionRequestedPeer';
  button_id?: number;
  peer: Peer;
};
export type messageActionSetChatWallPaper = {
  _: 'messageActionSetChatWallPaper';
  wallpaper: WallPaper;
};
export type messageActionSetSameChatWallPaper = {
  _: 'messageActionSetSameChatWallPaper';
  wallpaper: WallPaper;
};
export type MessageAction = messageActionEmpty | messageActionChatCreate | messageActionChatEditTitle | messageActionChatEditPhoto | messageActionChatDeletePhoto | messageActionChatAddUser | messageActionChatDeleteUser | messageActionChatJoinedByLink | messageActionChannelCreate | messageActionChatMigrateTo | messageActionChannelMigrateFrom | messageActionPinMessage | messageActionHistoryClear | messageActionGameScore | messageActionPaymentSentMe | messageActionPaymentSent | messageActionPhoneCall | messageActionScreenshotTaken | messageActionCustomAction | messageActionBotAllowed | messageActionSecureValuesSentMe | messageActionSecureValuesSent | messageActionContactSignUp | messageActionGeoProximityReached | messageActionGroupCall | messageActionInviteToGroupCall | messageActionSetMessagesTTL | messageActionGroupCallScheduled | messageActionSetChatTheme | messageActionChatJoinedByRequest | messageActionWebViewDataSentMe | messageActionWebViewDataSent | messageActionGiftPremium | messageActionTopicCreate | messageActionTopicEdit | messageActionSuggestProfilePhoto | messageActionRequestedPeer | messageActionSetChatWallPaper | messageActionSetSameChatWallPaper;

export type dialog = {
  _: 'dialog';
  flags?: number;
  pinned?: boolean;
  unread_mark?: boolean;
  peer: Peer;
  top_message?: number;
  read_inbox_max_id?: number;
  read_outbox_max_id?: number;
  unread_count?: number;
  unread_mentions_count?: number;
  unread_reactions_count?: number;
  notify_settings: PeerNotifySettings;
  pts?: number;
  draft?: DraftMessage;
  folder_id?: number;
  ttl_period?: number;
};
export type dialogFolder = {
  _: 'dialogFolder';
  flags?: number;
  pinned?: boolean;
  folder: Folder;
  peer: Peer;
  top_message?: number;
  unread_muted_peers_count?: number;
  unread_unmuted_peers_count?: number;
  unread_muted_messages_count?: number;
  unread_unmuted_messages_count?: number;
};
export type Dialog = dialog | dialogFolder;

export type photoEmpty = {
  _: 'photoEmpty';
  id?: number;
};
export type photo = {
  _: 'photo';
  flags?: number;
  has_stickers?: boolean;
  id?: number;
  access_hash?: number;
  file_reference?: Uint8Array;
  date?: number;
  sizes: Array<PhotoSize>;
  video_sizes?: Array<VideoSize>;
  dc_id?: number;
};
export type Photo = photoEmpty | photo;

export type photoSizeEmpty = {
  _: 'photoSizeEmpty';
  type?: string;
};
export type photoSize = {
  _: 'photoSize';
  type?: string;
  w?: number;
  h?: number;
  size?: number;
};
export type photoCachedSize = {
  _: 'photoCachedSize';
  type?: string;
  w?: number;
  h?: number;
  bytes?: Uint8Array;
};
export type photoStrippedSize = {
  _: 'photoStrippedSize';
  type?: string;
  bytes?: Uint8Array;
};
export type photoSizeProgressive = {
  _: 'photoSizeProgressive';
  type?: string;
  w?: number;
  h?: number;
  sizes?: Array<number>;
};
export type photoPathSize = {
  _: 'photoPathSize';
  type?: string;
  bytes?: Uint8Array;
};
export type PhotoSize = photoSizeEmpty | photoSize | photoCachedSize | photoStrippedSize | photoSizeProgressive | photoPathSize;

export type geoPointEmpty = {
  _: 'geoPointEmpty';
};
export type geoPoint = {
  _: 'geoPoint';
  flags?: number;
  long?: number;
  lat?: number;
  access_hash?: number;
  accuracy_radius?: number;
};
export type GeoPoint = geoPointEmpty | geoPoint;

export type auth_sentCode = {
  _: 'auth.sentCode';
  flags?: number;
  type: auth_SentCodeType;
  phone_code_hash?: string;
  next_type?: auth_CodeType;
  timeout?: number;
};
export type auth_sentCodeSuccess = {
  _: 'auth.sentCodeSuccess';
  authorization: auth_Authorization;
};
export type auth_SentCode = auth_sentCode | auth_sentCodeSuccess;

export type auth_authorization = {
  _: 'auth.authorization';
  flags?: number;
  setup_password_required?: boolean;
  otherwise_relogin_days?: number;
  tmp_sessions?: number;
  future_auth_token?: Uint8Array;
  user: User;
};
export type auth_authorizationSignUpRequired = {
  _: 'auth.authorizationSignUpRequired';
  flags?: number;
  terms_of_service?: help_TermsOfService;
};
export type auth_Authorization = auth_authorization | auth_authorizationSignUpRequired;

export type auth_exportedAuthorization = {
  _: 'auth.exportedAuthorization';
  id?: number;
  bytes?: Uint8Array;
};
export type auth_ExportedAuthorization = auth_exportedAuthorization;

export type inputNotifyPeer = {
  _: 'inputNotifyPeer';
  peer: InputPeer;
};
export type inputNotifyUsers = {
  _: 'inputNotifyUsers';
};
export type inputNotifyChats = {
  _: 'inputNotifyChats';
};
export type inputNotifyBroadcasts = {
  _: 'inputNotifyBroadcasts';
};
export type inputNotifyForumTopic = {
  _: 'inputNotifyForumTopic';
  peer: InputPeer;
  top_msg_id?: number;
};
export type InputNotifyPeer = inputNotifyPeer | inputNotifyUsers | inputNotifyChats | inputNotifyBroadcasts | inputNotifyForumTopic;

export type inputPeerNotifySettings = {
  _: 'inputPeerNotifySettings';
  flags?: number;
  show_previews?: boolean;
  silent?: boolean;
  mute_until?: number;
  sound?: NotificationSound;
};
export type InputPeerNotifySettings = inputPeerNotifySettings;

export type peerNotifySettings = {
  _: 'peerNotifySettings';
  flags?: number;
  show_previews?: boolean;
  silent?: boolean;
  mute_until?: number;
  ios_sound?: NotificationSound;
  android_sound?: NotificationSound;
  other_sound?: NotificationSound;
};
export type PeerNotifySettings = peerNotifySettings;

export type peerSettings = {
  _: 'peerSettings';
  flags?: number;
  report_spam?: boolean;
  add_contact?: boolean;
  block_contact?: boolean;
  share_contact?: boolean;
  need_contacts_exception?: boolean;
  report_geo?: boolean;
  autoarchived?: boolean;
  invite_members?: boolean;
  request_chat_broadcast?: boolean;
  geo_distance?: number;
  request_chat_title?: string;
  request_chat_date?: number;
};
export type PeerSettings = peerSettings;

export type wallPaper = {
  _: 'wallPaper';
  id?: number;
  flags?: number;
  creator?: boolean;
  default?: boolean;
  pattern?: boolean;
  dark?: boolean;
  access_hash?: number;
  slug?: string;
  document: Document;
  settings?: WallPaperSettings;
};
export type wallPaperNoFile = {
  _: 'wallPaperNoFile';
  id?: number;
  flags?: number;
  default?: boolean;
  dark?: boolean;
  settings?: WallPaperSettings;
};
export type WallPaper = wallPaper | wallPaperNoFile;

export type inputReportReasonSpam = {
  _: 'inputReportReasonSpam';
};
export type inputReportReasonViolence = {
  _: 'inputReportReasonViolence';
};
export type inputReportReasonPornography = {
  _: 'inputReportReasonPornography';
};
export type inputReportReasonChildAbuse = {
  _: 'inputReportReasonChildAbuse';
};
export type inputReportReasonOther = {
  _: 'inputReportReasonOther';
};
export type inputReportReasonCopyright = {
  _: 'inputReportReasonCopyright';
};
export type inputReportReasonGeoIrrelevant = {
  _: 'inputReportReasonGeoIrrelevant';
};
export type inputReportReasonFake = {
  _: 'inputReportReasonFake';
};
export type inputReportReasonIllegalDrugs = {
  _: 'inputReportReasonIllegalDrugs';
};
export type inputReportReasonPersonalDetails = {
  _: 'inputReportReasonPersonalDetails';
};
export type ReportReason = inputReportReasonSpam | inputReportReasonViolence | inputReportReasonPornography | inputReportReasonChildAbuse | inputReportReasonOther | inputReportReasonCopyright | inputReportReasonGeoIrrelevant | inputReportReasonFake | inputReportReasonIllegalDrugs | inputReportReasonPersonalDetails;

export type userFull = {
  _: 'userFull';
  flags?: number;
  blocked?: boolean;
  phone_calls_available?: boolean;
  phone_calls_private?: boolean;
  can_pin_message?: boolean;
  has_scheduled?: boolean;
  video_calls_available?: boolean;
  voice_messages_forbidden?: boolean;
  translations_disabled?: boolean;
  id?: number;
  about?: string;
  settings: PeerSettings;
  personal_photo?: Photo;
  profile_photo?: Photo;
  fallback_photo?: Photo;
  notify_settings: PeerNotifySettings;
  bot_info?: BotInfo;
  pinned_msg_id?: number;
  common_chats_count?: number;
  folder_id?: number;
  ttl_period?: number;
  theme_emoticon?: string;
  private_forward_name?: string;
  bot_group_admin_rights?: ChatAdminRights;
  bot_broadcast_admin_rights?: ChatAdminRights;
  premium_gifts?: Array<PremiumGiftOption>;
  wallpaper?: WallPaper;
};
export type UserFull = userFull;

export type contact = {
  _: 'contact';
  user_id?: number;
  mutual?: boolean;
};
export type Contact = contact;

export type importedContact = {
  _: 'importedContact';
  user_id?: number;
  client_id?: number;
};
export type ImportedContact = importedContact;

export type contactStatus = {
  _: 'contactStatus';
  user_id?: number;
  status: UserStatus;
};
export type ContactStatus = contactStatus;

export type contacts_contactsNotModified = {
  _: 'contacts.contactsNotModified';
};
export type contacts_contacts = {
  _: 'contacts.contacts';
  contacts: Array<Contact>;
  saved_count?: number;
  users: Array<User>;
};
export type contacts_Contacts = contacts_contactsNotModified | contacts_contacts;

export type contacts_importedContacts = {
  _: 'contacts.importedContacts';
  imported: Array<ImportedContact>;
  popular_invites: Array<PopularContact>;
  retry_contacts?: Array<number>;
  users: Array<User>;
};
export type contacts_ImportedContacts = contacts_importedContacts;

export type contacts_blocked = {
  _: 'contacts.blocked';
  blocked: Array<PeerBlocked>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type contacts_blockedSlice = {
  _: 'contacts.blockedSlice';
  count?: number;
  blocked: Array<PeerBlocked>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type contacts_Blocked = contacts_blocked | contacts_blockedSlice;

export type messages_dialogs = {
  _: 'messages.dialogs';
  dialogs: Array<Dialog>;
  messages: Array<Message>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_dialogsSlice = {
  _: 'messages.dialogsSlice';
  count?: number;
  dialogs: Array<Dialog>;
  messages: Array<Message>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_dialogsNotModified = {
  _: 'messages.dialogsNotModified';
  count?: number;
};
export type messages_Dialogs = messages_dialogs | messages_dialogsSlice | messages_dialogsNotModified;

export type messages_messages = {
  _: 'messages.messages';
  messages: Array<Message>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_messagesSlice = {
  _: 'messages.messagesSlice';
  flags?: number;
  inexact?: boolean;
  count?: number;
  next_rate?: number;
  offset_id_offset?: number;
  messages: Array<Message>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_channelMessages = {
  _: 'messages.channelMessages';
  flags?: number;
  inexact?: boolean;
  pts?: number;
  count?: number;
  offset_id_offset?: number;
  messages: Array<Message>;
  topics: Array<ForumTopic>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_messagesNotModified = {
  _: 'messages.messagesNotModified';
  count?: number;
};
export type messages_Messages = messages_messages | messages_messagesSlice | messages_channelMessages | messages_messagesNotModified;

export type messages_chats = {
  _: 'messages.chats';
  chats: Array<Chat>;
};
export type messages_chatsSlice = {
  _: 'messages.chatsSlice';
  count?: number;
  chats: Array<Chat>;
};
export type messages_Chats = messages_chats | messages_chatsSlice;

export type messages_chatFull = {
  _: 'messages.chatFull';
  full_chat: ChatFull;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_ChatFull = messages_chatFull;

export type messages_affectedHistory = {
  _: 'messages.affectedHistory';
  pts?: number;
  pts_count?: number;
  offset?: number;
};
export type messages_AffectedHistory = messages_affectedHistory;

export type inputMessagesFilterEmpty = {
  _: 'inputMessagesFilterEmpty';
};
export type inputMessagesFilterPhotos = {
  _: 'inputMessagesFilterPhotos';
};
export type inputMessagesFilterVideo = {
  _: 'inputMessagesFilterVideo';
};
export type inputMessagesFilterPhotoVideo = {
  _: 'inputMessagesFilterPhotoVideo';
};
export type inputMessagesFilterDocument = {
  _: 'inputMessagesFilterDocument';
};
export type inputMessagesFilterUrl = {
  _: 'inputMessagesFilterUrl';
};
export type inputMessagesFilterGif = {
  _: 'inputMessagesFilterGif';
};
export type inputMessagesFilterVoice = {
  _: 'inputMessagesFilterVoice';
};
export type inputMessagesFilterMusic = {
  _: 'inputMessagesFilterMusic';
};
export type inputMessagesFilterChatPhotos = {
  _: 'inputMessagesFilterChatPhotos';
};
export type inputMessagesFilterPhoneCalls = {
  _: 'inputMessagesFilterPhoneCalls';
  flags?: number;
  missed?: boolean;
};
export type inputMessagesFilterRoundVoice = {
  _: 'inputMessagesFilterRoundVoice';
};
export type inputMessagesFilterRoundVideo = {
  _: 'inputMessagesFilterRoundVideo';
};
export type inputMessagesFilterMyMentions = {
  _: 'inputMessagesFilterMyMentions';
};
export type inputMessagesFilterGeo = {
  _: 'inputMessagesFilterGeo';
};
export type inputMessagesFilterContacts = {
  _: 'inputMessagesFilterContacts';
};
export type inputMessagesFilterPinned = {
  _: 'inputMessagesFilterPinned';
};
export type MessagesFilter = inputMessagesFilterEmpty | inputMessagesFilterPhotos | inputMessagesFilterVideo | inputMessagesFilterPhotoVideo | inputMessagesFilterDocument | inputMessagesFilterUrl | inputMessagesFilterGif | inputMessagesFilterVoice | inputMessagesFilterMusic | inputMessagesFilterChatPhotos | inputMessagesFilterPhoneCalls | inputMessagesFilterRoundVoice | inputMessagesFilterRoundVideo | inputMessagesFilterMyMentions | inputMessagesFilterGeo | inputMessagesFilterContacts | inputMessagesFilterPinned;

export type updateNewMessage = {
  _: 'updateNewMessage';
  message: Message;
  pts?: number;
  pts_count?: number;
};
export type updateMessageID = {
  _: 'updateMessageID';
  id?: number;
  random_id?: number;
};
export type updateDeleteMessages = {
  _: 'updateDeleteMessages';
  messages?: Array<number>;
  pts?: number;
  pts_count?: number;
};
export type updateUserTyping = {
  _: 'updateUserTyping';
  user_id?: number;
  action: SendMessageAction;
};
export type updateChatUserTyping = {
  _: 'updateChatUserTyping';
  chat_id?: number;
  from_id: Peer;
  action: SendMessageAction;
};
export type updateChatParticipants = {
  _: 'updateChatParticipants';
  participants: ChatParticipants;
};
export type updateUserStatus = {
  _: 'updateUserStatus';
  user_id?: number;
  status: UserStatus;
};
export type updateUserName = {
  _: 'updateUserName';
  user_id?: number;
  first_name?: string;
  last_name?: string;
  usernames: Array<Username>;
};
export type updateNewEncryptedMessage = {
  _: 'updateNewEncryptedMessage';
  message: EncryptedMessage;
  qts?: number;
};
export type updateEncryptedChatTyping = {
  _: 'updateEncryptedChatTyping';
  chat_id?: number;
};
export type updateEncryption = {
  _: 'updateEncryption';
  chat: EncryptedChat;
  date?: number;
};
export type updateEncryptedMessagesRead = {
  _: 'updateEncryptedMessagesRead';
  chat_id?: number;
  max_date?: number;
  date?: number;
};
export type updateChatParticipantAdd = {
  _: 'updateChatParticipantAdd';
  chat_id?: number;
  user_id?: number;
  inviter_id?: number;
  date?: number;
  version?: number;
};
export type updateChatParticipantDelete = {
  _: 'updateChatParticipantDelete';
  chat_id?: number;
  user_id?: number;
  version?: number;
};
export type updateDcOptions = {
  _: 'updateDcOptions';
  dc_options: Array<DcOption>;
};
export type updateNotifySettings = {
  _: 'updateNotifySettings';
  peer: NotifyPeer;
  notify_settings: PeerNotifySettings;
};
export type updateServiceNotification = {
  _: 'updateServiceNotification';
  flags?: number;
  popup?: boolean;
  inbox_date?: number;
  type?: string;
  message?: string;
  media: MessageMedia;
  entities: Array<MessageEntity>;
};
export type updatePrivacy = {
  _: 'updatePrivacy';
  key: PrivacyKey;
  rules: Array<PrivacyRule>;
};
export type updateUserPhone = {
  _: 'updateUserPhone';
  user_id?: number;
  phone?: string;
};
export type updateReadHistoryInbox = {
  _: 'updateReadHistoryInbox';
  flags?: number;
  folder_id?: number;
  peer: Peer;
  max_id?: number;
  still_unread_count?: number;
  pts?: number;
  pts_count?: number;
};
export type updateReadHistoryOutbox = {
  _: 'updateReadHistoryOutbox';
  peer: Peer;
  max_id?: number;
  pts?: number;
  pts_count?: number;
};
export type updateWebPage = {
  _: 'updateWebPage';
  webpage: WebPage;
  pts?: number;
  pts_count?: number;
};
export type updateReadMessagesContents = {
  _: 'updateReadMessagesContents';
  messages?: Array<number>;
  pts?: number;
  pts_count?: number;
};
export type updateChannelTooLong = {
  _: 'updateChannelTooLong';
  flags?: number;
  channel_id?: number;
  pts?: number;
};
export type updateChannel = {
  _: 'updateChannel';
  channel_id?: number;
};
export type updateNewChannelMessage = {
  _: 'updateNewChannelMessage';
  message: Message;
  pts?: number;
  pts_count?: number;
};
export type updateReadChannelInbox = {
  _: 'updateReadChannelInbox';
  flags?: number;
  folder_id?: number;
  channel_id?: number;
  max_id?: number;
  still_unread_count?: number;
  pts?: number;
};
export type updateDeleteChannelMessages = {
  _: 'updateDeleteChannelMessages';
  channel_id?: number;
  messages?: Array<number>;
  pts?: number;
  pts_count?: number;
};
export type updateChannelMessageViews = {
  _: 'updateChannelMessageViews';
  channel_id?: number;
  id?: number;
  views?: number;
};
export type updateChatParticipantAdmin = {
  _: 'updateChatParticipantAdmin';
  chat_id?: number;
  user_id?: number;
  is_admin?: boolean;
  version?: number;
};
export type updateNewStickerSet = {
  _: 'updateNewStickerSet';
  stickerset: messages_StickerSet;
};
export type updateStickerSetsOrder = {
  _: 'updateStickerSetsOrder';
  flags?: number;
  masks?: boolean;
  emojis?: boolean;
  order?: Array<number>;
};
export type updateStickerSets = {
  _: 'updateStickerSets';
  flags?: number;
  masks?: boolean;
  emojis?: boolean;
};
export type updateSavedGifs = {
  _: 'updateSavedGifs';
};
export type updateBotInlineQuery = {
  _: 'updateBotInlineQuery';
  flags?: number;
  query_id?: number;
  user_id?: number;
  query?: string;
  geo?: GeoPoint;
  peer_type?: InlineQueryPeerType;
  offset?: string;
};
export type updateBotInlineSend = {
  _: 'updateBotInlineSend';
  flags?: number;
  user_id?: number;
  query?: string;
  geo?: GeoPoint;
  id?: string;
  msg_id?: InputBotInlineMessageID;
};
export type updateEditChannelMessage = {
  _: 'updateEditChannelMessage';
  message: Message;
  pts?: number;
  pts_count?: number;
};
export type updateBotCallbackQuery = {
  _: 'updateBotCallbackQuery';
  flags?: number;
  query_id?: number;
  user_id?: number;
  peer: Peer;
  msg_id?: number;
  chat_instance?: number;
  data?: Uint8Array;
  game_short_name?: string;
};
export type updateEditMessage = {
  _: 'updateEditMessage';
  message: Message;
  pts?: number;
  pts_count?: number;
};
export type updateInlineBotCallbackQuery = {
  _: 'updateInlineBotCallbackQuery';
  flags?: number;
  query_id?: number;
  user_id?: number;
  msg_id: InputBotInlineMessageID;
  chat_instance?: number;
  data?: Uint8Array;
  game_short_name?: string;
};
export type updateReadChannelOutbox = {
  _: 'updateReadChannelOutbox';
  channel_id?: number;
  max_id?: number;
};
export type updateDraftMessage = {
  _: 'updateDraftMessage';
  flags?: number;
  peer: Peer;
  top_msg_id?: number;
  draft: DraftMessage;
};
export type updateReadFeaturedStickers = {
  _: 'updateReadFeaturedStickers';
};
export type updateRecentStickers = {
  _: 'updateRecentStickers';
};
export type updateConfig = {
  _: 'updateConfig';
};
export type updatePtsChanged = {
  _: 'updatePtsChanged';
};
export type updateChannelWebPage = {
  _: 'updateChannelWebPage';
  channel_id?: number;
  webpage: WebPage;
  pts?: number;
  pts_count?: number;
};
export type updateDialogPinned = {
  _: 'updateDialogPinned';
  flags?: number;
  pinned?: boolean;
  folder_id?: number;
  peer: DialogPeer;
};
export type updatePinnedDialogs = {
  _: 'updatePinnedDialogs';
  flags?: number;
  folder_id?: number;
  order?: Array<DialogPeer>;
};
export type updateBotWebhookJSON = {
  _: 'updateBotWebhookJSON';
  data: DataJSON;
};
export type updateBotWebhookJSONQuery = {
  _: 'updateBotWebhookJSONQuery';
  query_id?: number;
  data: DataJSON;
  timeout?: number;
};
export type updateBotShippingQuery = {
  _: 'updateBotShippingQuery';
  query_id?: number;
  user_id?: number;
  payload?: Uint8Array;
  shipping_address: PostAddress;
};
export type updateBotPrecheckoutQuery = {
  _: 'updateBotPrecheckoutQuery';
  flags?: number;
  query_id?: number;
  user_id?: number;
  payload?: Uint8Array;
  info?: PaymentRequestedInfo;
  shipping_option_id?: string;
  currency?: string;
  total_amount?: number;
};
export type updatePhoneCall = {
  _: 'updatePhoneCall';
  phone_call: PhoneCall;
};
export type updateLangPackTooLong = {
  _: 'updateLangPackTooLong';
  lang_code?: string;
};
export type updateLangPack = {
  _: 'updateLangPack';
  difference: LangPackDifference;
};
export type updateFavedStickers = {
  _: 'updateFavedStickers';
};
export type updateChannelReadMessagesContents = {
  _: 'updateChannelReadMessagesContents';
  flags?: number;
  channel_id?: number;
  top_msg_id?: number;
  messages?: Array<number>;
};
export type updateContactsReset = {
  _: 'updateContactsReset';
};
export type updateChannelAvailableMessages = {
  _: 'updateChannelAvailableMessages';
  channel_id?: number;
  available_min_id?: number;
};
export type updateDialogUnreadMark = {
  _: 'updateDialogUnreadMark';
  flags?: number;
  unread?: boolean;
  peer: DialogPeer;
};
export type updateMessagePoll = {
  _: 'updateMessagePoll';
  flags?: number;
  poll_id?: number;
  poll?: Poll;
  results: PollResults;
};
export type updateChatDefaultBannedRights = {
  _: 'updateChatDefaultBannedRights';
  peer: Peer;
  default_banned_rights: ChatBannedRights;
  version?: number;
};
export type updateFolderPeers = {
  _: 'updateFolderPeers';
  folder_peers: Array<FolderPeer>;
  pts?: number;
  pts_count?: number;
};
export type updatePeerSettings = {
  _: 'updatePeerSettings';
  peer: Peer;
  settings: PeerSettings;
};
export type updatePeerLocated = {
  _: 'updatePeerLocated';
  peers: Array<PeerLocated>;
};
export type updateNewScheduledMessage = {
  _: 'updateNewScheduledMessage';
  message: Message;
};
export type updateDeleteScheduledMessages = {
  _: 'updateDeleteScheduledMessages';
  peer: Peer;
  messages?: Array<number>;
};
export type updateTheme = {
  _: 'updateTheme';
  theme: Theme;
};
export type updateGeoLiveViewed = {
  _: 'updateGeoLiveViewed';
  peer: Peer;
  msg_id?: number;
};
export type updateLoginToken = {
  _: 'updateLoginToken';
};
export type updateMessagePollVote = {
  _: 'updateMessagePollVote';
  poll_id?: number;
  user_id?: number;
  options?: Array<Uint8Array>;
  qts?: number;
};
export type updateDialogFilter = {
  _: 'updateDialogFilter';
  flags?: number;
  id?: number;
  filter?: DialogFilter;
};
export type updateDialogFilterOrder = {
  _: 'updateDialogFilterOrder';
  order?: Array<number>;
};
export type updateDialogFilters = {
  _: 'updateDialogFilters';
};
export type updatePhoneCallSignalingData = {
  _: 'updatePhoneCallSignalingData';
  phone_call_id?: number;
  data?: Uint8Array;
};
export type updateChannelMessageForwards = {
  _: 'updateChannelMessageForwards';
  channel_id?: number;
  id?: number;
  forwards?: number;
};
export type updateReadChannelDiscussionInbox = {
  _: 'updateReadChannelDiscussionInbox';
  flags?: number;
  channel_id?: number;
  top_msg_id?: number;
  read_max_id?: number;
  broadcast_id?: number;
  broadcast_post?: number;
};
export type updateReadChannelDiscussionOutbox = {
  _: 'updateReadChannelDiscussionOutbox';
  channel_id?: number;
  top_msg_id?: number;
  read_max_id?: number;
};
export type updatePeerBlocked = {
  _: 'updatePeerBlocked';
  peer_id: Peer;
  blocked?: boolean;
};
export type updateChannelUserTyping = {
  _: 'updateChannelUserTyping';
  flags?: number;
  channel_id?: number;
  top_msg_id?: number;
  from_id: Peer;
  action: SendMessageAction;
};
export type updatePinnedMessages = {
  _: 'updatePinnedMessages';
  flags?: number;
  pinned?: boolean;
  peer: Peer;
  messages?: Array<number>;
  pts?: number;
  pts_count?: number;
};
export type updatePinnedChannelMessages = {
  _: 'updatePinnedChannelMessages';
  flags?: number;
  pinned?: boolean;
  channel_id?: number;
  messages?: Array<number>;
  pts?: number;
  pts_count?: number;
};
export type updateChat = {
  _: 'updateChat';
  chat_id?: number;
};
export type updateGroupCallParticipants = {
  _: 'updateGroupCallParticipants';
  call: InputGroupCall;
  participants: Array<GroupCallParticipant>;
  version?: number;
};
export type updateGroupCall = {
  _: 'updateGroupCall';
  chat_id?: number;
  call: GroupCall;
};
export type updatePeerHistoryTTL = {
  _: 'updatePeerHistoryTTL';
  flags?: number;
  peer: Peer;
  ttl_period?: number;
};
export type updateChatParticipant = {
  _: 'updateChatParticipant';
  flags?: number;
  chat_id?: number;
  date?: number;
  actor_id?: number;
  user_id?: number;
  prev_participant?: ChatParticipant;
  new_participant?: ChatParticipant;
  invite?: ExportedChatInvite;
  qts?: number;
};
export type updateChannelParticipant = {
  _: 'updateChannelParticipant';
  flags?: number;
  via_chatlist?: boolean;
  channel_id?: number;
  date?: number;
  actor_id?: number;
  user_id?: number;
  prev_participant?: ChannelParticipant;
  new_participant?: ChannelParticipant;
  invite?: ExportedChatInvite;
  qts?: number;
};
export type updateBotStopped = {
  _: 'updateBotStopped';
  user_id?: number;
  date?: number;
  stopped?: boolean;
  qts?: number;
};
export type updateGroupCallConnection = {
  _: 'updateGroupCallConnection';
  flags?: number;
  presentation?: boolean;
  params: DataJSON;
};
export type updateBotCommands = {
  _: 'updateBotCommands';
  peer: Peer;
  bot_id?: number;
  commands: Array<BotCommand>;
};
export type updatePendingJoinRequests = {
  _: 'updatePendingJoinRequests';
  peer: Peer;
  requests_pending?: number;
  recent_requesters?: Array<number>;
};
export type updateBotChatInviteRequester = {
  _: 'updateBotChatInviteRequester';
  peer: Peer;
  date?: number;
  user_id?: number;
  about?: string;
  invite: ExportedChatInvite;
  qts?: number;
};
export type updateMessageReactions = {
  _: 'updateMessageReactions';
  flags?: number;
  peer: Peer;
  msg_id?: number;
  top_msg_id?: number;
  reactions: MessageReactions;
};
export type updateAttachMenuBots = {
  _: 'updateAttachMenuBots';
};
export type updateWebViewResultSent = {
  _: 'updateWebViewResultSent';
  query_id?: number;
};
export type updateBotMenuButton = {
  _: 'updateBotMenuButton';
  bot_id?: number;
  button: BotMenuButton;
};
export type updateSavedRingtones = {
  _: 'updateSavedRingtones';
};
export type updateTranscribedAudio = {
  _: 'updateTranscribedAudio';
  flags?: number;
  pending?: boolean;
  peer: Peer;
  msg_id?: number;
  transcription_id?: number;
  text?: string;
};
export type updateReadFeaturedEmojiStickers = {
  _: 'updateReadFeaturedEmojiStickers';
};
export type updateUserEmojiStatus = {
  _: 'updateUserEmojiStatus';
  user_id?: number;
  emoji_status: EmojiStatus;
};
export type updateRecentEmojiStatuses = {
  _: 'updateRecentEmojiStatuses';
};
export type updateRecentReactions = {
  _: 'updateRecentReactions';
};
export type updateMoveStickerSetToTop = {
  _: 'updateMoveStickerSetToTop';
  flags?: number;
  masks?: boolean;
  emojis?: boolean;
  stickerset?: number;
};
export type updateMessageExtendedMedia = {
  _: 'updateMessageExtendedMedia';
  peer: Peer;
  msg_id?: number;
  extended_media: MessageExtendedMedia;
};
export type updateChannelPinnedTopic = {
  _: 'updateChannelPinnedTopic';
  flags?: number;
  pinned?: boolean;
  channel_id?: number;
  topic_id?: number;
};
export type updateChannelPinnedTopics = {
  _: 'updateChannelPinnedTopics';
  flags?: number;
  channel_id?: number;
  order?: Array<number>;
};
export type updateUser = {
  _: 'updateUser';
  user_id?: number;
};
export type updateAutoSaveSettings = {
  _: 'updateAutoSaveSettings';
};
export type updateGroupInvitePrivacyForbidden = {
  _: 'updateGroupInvitePrivacyForbidden';
  user_id?: number;
};
export type Update = updateNewMessage | updateMessageID | updateDeleteMessages | updateUserTyping | updateChatUserTyping | updateChatParticipants | updateUserStatus | updateUserName | updateNewEncryptedMessage | updateEncryptedChatTyping | updateEncryption | updateEncryptedMessagesRead | updateChatParticipantAdd | updateChatParticipantDelete | updateDcOptions | updateNotifySettings | updateServiceNotification | updatePrivacy | updateUserPhone | updateReadHistoryInbox | updateReadHistoryOutbox | updateWebPage | updateReadMessagesContents | updateChannelTooLong | updateChannel | updateNewChannelMessage | updateReadChannelInbox | updateDeleteChannelMessages | updateChannelMessageViews | updateChatParticipantAdmin | updateNewStickerSet | updateStickerSetsOrder | updateStickerSets | updateSavedGifs | updateBotInlineQuery | updateBotInlineSend | updateEditChannelMessage | updateBotCallbackQuery | updateEditMessage | updateInlineBotCallbackQuery | updateReadChannelOutbox | updateDraftMessage | updateReadFeaturedStickers | updateRecentStickers | updateConfig | updatePtsChanged | updateChannelWebPage | updateDialogPinned | updatePinnedDialogs | updateBotWebhookJSON | updateBotWebhookJSONQuery | updateBotShippingQuery | updateBotPrecheckoutQuery | updatePhoneCall | updateLangPackTooLong | updateLangPack | updateFavedStickers | updateChannelReadMessagesContents | updateContactsReset | updateChannelAvailableMessages | updateDialogUnreadMark | updateMessagePoll | updateChatDefaultBannedRights | updateFolderPeers | updatePeerSettings | updatePeerLocated | updateNewScheduledMessage | updateDeleteScheduledMessages | updateTheme | updateGeoLiveViewed | updateLoginToken | updateMessagePollVote | updateDialogFilter | updateDialogFilterOrder | updateDialogFilters | updatePhoneCallSignalingData | updateChannelMessageForwards | updateReadChannelDiscussionInbox | updateReadChannelDiscussionOutbox | updatePeerBlocked | updateChannelUserTyping | updatePinnedMessages | updatePinnedChannelMessages | updateChat | updateGroupCallParticipants | updateGroupCall | updatePeerHistoryTTL | updateChatParticipant | updateChannelParticipant | updateBotStopped | updateGroupCallConnection | updateBotCommands | updatePendingJoinRequests | updateBotChatInviteRequester | updateMessageReactions | updateAttachMenuBots | updateWebViewResultSent | updateBotMenuButton | updateSavedRingtones | updateTranscribedAudio | updateReadFeaturedEmojiStickers | updateUserEmojiStatus | updateRecentEmojiStatuses | updateRecentReactions | updateMoveStickerSetToTop | updateMessageExtendedMedia | updateChannelPinnedTopic | updateChannelPinnedTopics | updateUser | updateAutoSaveSettings | updateGroupInvitePrivacyForbidden;

export type updates_state = {
  _: 'updates.state';
  pts?: number;
  qts?: number;
  date?: number;
  seq?: number;
  unread_count?: number;
};
export type updates_State = updates_state;

export type updates_differenceEmpty = {
  _: 'updates.differenceEmpty';
  date?: number;
  seq?: number;
};
export type updates_difference = {
  _: 'updates.difference';
  new_messages: Array<Message>;
  new_encrypted_messages: Array<EncryptedMessage>;
  other_updates: Array<Update>;
  chats: Array<Chat>;
  users: Array<User>;
  state: updates_State;
};
export type updates_differenceSlice = {
  _: 'updates.differenceSlice';
  new_messages: Array<Message>;
  new_encrypted_messages: Array<EncryptedMessage>;
  other_updates: Array<Update>;
  chats: Array<Chat>;
  users: Array<User>;
  intermediate_state: updates_State;
};
export type updates_differenceTooLong = {
  _: 'updates.differenceTooLong';
  pts?: number;
};
export type updates_Difference = updates_differenceEmpty | updates_difference | updates_differenceSlice | updates_differenceTooLong;

export type updatesTooLong = {
  _: 'updatesTooLong';
};
export type updateShortMessage = {
  _: 'updateShortMessage';
  flags?: number;
  out?: boolean;
  mentioned?: boolean;
  media_unread?: boolean;
  silent?: boolean;
  id?: number;
  user_id?: number;
  message?: string;
  pts?: number;
  pts_count?: number;
  date?: number;
  fwd_from?: MessageFwdHeader;
  via_bot_id?: number;
  reply_to?: MessageReplyHeader;
  entities?: Array<MessageEntity>;
  ttl_period?: number;
};
export type updateShortChatMessage = {
  _: 'updateShortChatMessage';
  flags?: number;
  out?: boolean;
  mentioned?: boolean;
  media_unread?: boolean;
  silent?: boolean;
  id?: number;
  from_id?: number;
  chat_id?: number;
  message?: string;
  pts?: number;
  pts_count?: number;
  date?: number;
  fwd_from?: MessageFwdHeader;
  via_bot_id?: number;
  reply_to?: MessageReplyHeader;
  entities?: Array<MessageEntity>;
  ttl_period?: number;
};
export type updateShort = {
  _: 'updateShort';
  update: Update;
  date?: number;
};
export type updatesCombined = {
  _: 'updatesCombined';
  updates: Array<Update>;
  users: Array<User>;
  chats: Array<Chat>;
  date?: number;
  seq_start?: number;
  seq?: number;
};
export type updates = {
  _: 'updates';
  updates: Array<Update>;
  users: Array<User>;
  chats: Array<Chat>;
  date?: number;
  seq?: number;
};
export type updateShortSentMessage = {
  _: 'updateShortSentMessage';
  flags?: number;
  out?: boolean;
  id?: number;
  pts?: number;
  pts_count?: number;
  date?: number;
  media?: MessageMedia;
  entities?: Array<MessageEntity>;
  ttl_period?: number;
};
export type Updates = updatesTooLong | updateShortMessage | updateShortChatMessage | updateShort | updatesCombined | updates | updateShortSentMessage;

export type photos_photos = {
  _: 'photos.photos';
  photos: Array<Photo>;
  users: Array<User>;
};
export type photos_photosSlice = {
  _: 'photos.photosSlice';
  count?: number;
  photos: Array<Photo>;
  users: Array<User>;
};
export type photos_Photos = photos_photos | photos_photosSlice;

export type photos_photo = {
  _: 'photos.photo';
  photo: Photo;
  users: Array<User>;
};
export type photos_Photo = photos_photo;

export type upload_file = {
  _: 'upload.file';
  type: storage_FileType;
  mtime?: number;
  bytes?: Uint8Array;
};
export type upload_fileCdnRedirect = {
  _: 'upload.fileCdnRedirect';
  dc_id?: number;
  file_token?: Uint8Array;
  encryption_key?: Uint8Array;
  encryption_iv?: Uint8Array;
  file_hashes: Array<FileHash>;
};
export type upload_File = upload_file | upload_fileCdnRedirect;

export type dcOption = {
  _: 'dcOption';
  flags?: number;
  ipv6?: boolean;
  media_only?: boolean;
  tcpo_only?: boolean;
  cdn?: boolean;
  static?: boolean;
  this_port_only?: boolean;
  id?: number;
  ip_address?: string;
  port?: number;
  secret?: Uint8Array;
};
export type DcOption = dcOption;

export type config = {
  _: 'config';
  flags?: number;
  default_p2p_contacts?: boolean;
  preload_featured_stickers?: boolean;
  revoke_pm_inbox?: boolean;
  blocked_mode?: boolean;
  force_try_ipv6?: boolean;
  date?: number;
  expires?: number;
  test_mode?: boolean;
  this_dc?: number;
  dc_options: Array<DcOption>;
  dc_txt_domain_name?: string;
  chat_size_max?: number;
  megagroup_size_max?: number;
  forwarded_count_max?: number;
  online_update_period_ms?: number;
  offline_blur_timeout_ms?: number;
  offline_idle_timeout_ms?: number;
  online_cloud_timeout_ms?: number;
  notify_cloud_delay_ms?: number;
  notify_default_delay_ms?: number;
  push_chat_period_ms?: number;
  push_chat_limit?: number;
  edit_time_limit?: number;
  revoke_time_limit?: number;
  revoke_pm_time_limit?: number;
  rating_e_decay?: number;
  stickers_recent_limit?: number;
  channels_read_media_period?: number;
  tmp_sessions?: number;
  call_receive_timeout_ms?: number;
  call_ring_timeout_ms?: number;
  call_connect_timeout_ms?: number;
  call_packet_timeout_ms?: number;
  me_url_prefix?: string;
  autoupdate_url_prefix?: string;
  gif_search_username?: string;
  venue_search_username?: string;
  img_search_username?: string;
  static_maps_provider?: string;
  caption_length_max?: number;
  message_length_max?: number;
  webfile_dc_id?: number;
  suggested_lang_code?: string;
  lang_pack_version?: number;
  base_lang_pack_version?: number;
  reactions_default?: Reaction;
  autologin_token?: string;
};
export type Config = config;

export type nearestDc = {
  _: 'nearestDc';
  country?: string;
  this_dc?: number;
  nearest_dc?: number;
};
export type NearestDc = nearestDc;

export type help_appUpdate = {
  _: 'help.appUpdate';
  flags?: number;
  can_not_skip?: boolean;
  id?: number;
  version?: string;
  text?: string;
  entities: Array<MessageEntity>;
  document?: Document;
  url?: string;
  sticker?: Document;
};
export type help_noAppUpdate = {
  _: 'help.noAppUpdate';
};
export type help_AppUpdate = help_appUpdate | help_noAppUpdate;

export type help_inviteText = {
  _: 'help.inviteText';
  message?: string;
};
export type help_InviteText = help_inviteText;

export type encryptedChatEmpty = {
  _: 'encryptedChatEmpty';
  id?: number;
};
export type encryptedChatWaiting = {
  _: 'encryptedChatWaiting';
  id?: number;
  access_hash?: number;
  date?: number;
  admin_id?: number;
  participant_id?: number;
};
export type encryptedChatRequested = {
  _: 'encryptedChatRequested';
  flags?: number;
  folder_id?: number;
  id?: number;
  access_hash?: number;
  date?: number;
  admin_id?: number;
  participant_id?: number;
  g_a?: Uint8Array;
};
export type encryptedChat = {
  _: 'encryptedChat';
  id?: number;
  access_hash?: number;
  date?: number;
  admin_id?: number;
  participant_id?: number;
  g_a_or_b?: Uint8Array;
  key_fingerprint?: number;
};
export type encryptedChatDiscarded = {
  _: 'encryptedChatDiscarded';
  flags?: number;
  history_deleted?: boolean;
  id?: number;
};
export type EncryptedChat = encryptedChatEmpty | encryptedChatWaiting | encryptedChatRequested | encryptedChat | encryptedChatDiscarded;

export type inputEncryptedChat = {
  _: 'inputEncryptedChat';
  chat_id?: number;
  access_hash?: number;
};
export type InputEncryptedChat = inputEncryptedChat;

export type encryptedFileEmpty = {
  _: 'encryptedFileEmpty';
};
export type encryptedFile = {
  _: 'encryptedFile';
  id?: number;
  access_hash?: number;
  size?: number;
  dc_id?: number;
  key_fingerprint?: number;
};
export type EncryptedFile = encryptedFileEmpty | encryptedFile;

export type inputEncryptedFileEmpty = {
  _: 'inputEncryptedFileEmpty';
};
export type inputEncryptedFileUploaded = {
  _: 'inputEncryptedFileUploaded';
  id?: number;
  parts?: number;
  md5_checksum?: string;
  key_fingerprint?: number;
};
export type inputEncryptedFile = {
  _: 'inputEncryptedFile';
  id?: number;
  access_hash?: number;
};
export type inputEncryptedFileBigUploaded = {
  _: 'inputEncryptedFileBigUploaded';
  id?: number;
  parts?: number;
  key_fingerprint?: number;
};
export type InputEncryptedFile = inputEncryptedFileEmpty | inputEncryptedFileUploaded | inputEncryptedFile | inputEncryptedFileBigUploaded;

export type encryptedMessage = {
  _: 'encryptedMessage';
  random_id?: number;
  chat_id?: number;
  date?: number;
  bytes?: Uint8Array;
  file: EncryptedFile;
};
export type encryptedMessageService = {
  _: 'encryptedMessageService';
  random_id?: number;
  chat_id?: number;
  date?: number;
  bytes?: Uint8Array;
};
export type EncryptedMessage = encryptedMessage | encryptedMessageService;

export type messages_dhConfigNotModified = {
  _: 'messages.dhConfigNotModified';
  random?: Uint8Array;
};
export type messages_dhConfig = {
  _: 'messages.dhConfig';
  g?: number;
  p?: Uint8Array;
  version?: number;
  random?: Uint8Array;
};
export type messages_DhConfig = messages_dhConfigNotModified | messages_dhConfig;

export type messages_sentEncryptedMessage = {
  _: 'messages.sentEncryptedMessage';
  date?: number;
};
export type messages_sentEncryptedFile = {
  _: 'messages.sentEncryptedFile';
  date?: number;
  file: EncryptedFile;
};
export type messages_SentEncryptedMessage = messages_sentEncryptedMessage | messages_sentEncryptedFile;

export type inputDocumentEmpty = {
  _: 'inputDocumentEmpty';
};
export type inputDocument = {
  _: 'inputDocument';
  id?: number;
  access_hash?: number;
  file_reference?: Uint8Array;
};
export type InputDocument = inputDocumentEmpty | inputDocument;

export type documentEmpty = {
  _: 'documentEmpty';
  id?: number;
};
export type document = {
  _: 'document';
  flags?: number;
  id?: number;
  access_hash?: number;
  file_reference?: Uint8Array;
  date?: number;
  mime_type?: string;
  size?: number;
  thumbs?: Array<PhotoSize>;
  video_thumbs?: Array<VideoSize>;
  dc_id?: number;
  attributes: Array<DocumentAttribute>;
};
export type Document = documentEmpty | document;

export type help_support = {
  _: 'help.support';
  phone_number?: string;
  user: User;
};
export type help_Support = help_support;

export type notifyPeer = {
  _: 'notifyPeer';
  peer: Peer;
};
export type notifyUsers = {
  _: 'notifyUsers';
};
export type notifyChats = {
  _: 'notifyChats';
};
export type notifyBroadcasts = {
  _: 'notifyBroadcasts';
};
export type notifyForumTopic = {
  _: 'notifyForumTopic';
  peer: Peer;
  top_msg_id?: number;
};
export type NotifyPeer = notifyPeer | notifyUsers | notifyChats | notifyBroadcasts | notifyForumTopic;

export type sendMessageTypingAction = {
  _: 'sendMessageTypingAction';
};
export type sendMessageCancelAction = {
  _: 'sendMessageCancelAction';
};
export type sendMessageRecordVideoAction = {
  _: 'sendMessageRecordVideoAction';
};
export type sendMessageUploadVideoAction = {
  _: 'sendMessageUploadVideoAction';
  progress?: number;
};
export type sendMessageRecordAudioAction = {
  _: 'sendMessageRecordAudioAction';
};
export type sendMessageUploadAudioAction = {
  _: 'sendMessageUploadAudioAction';
  progress?: number;
};
export type sendMessageUploadPhotoAction = {
  _: 'sendMessageUploadPhotoAction';
  progress?: number;
};
export type sendMessageUploadDocumentAction = {
  _: 'sendMessageUploadDocumentAction';
  progress?: number;
};
export type sendMessageGeoLocationAction = {
  _: 'sendMessageGeoLocationAction';
};
export type sendMessageChooseContactAction = {
  _: 'sendMessageChooseContactAction';
};
export type sendMessageGamePlayAction = {
  _: 'sendMessageGamePlayAction';
};
export type sendMessageRecordRoundAction = {
  _: 'sendMessageRecordRoundAction';
};
export type sendMessageUploadRoundAction = {
  _: 'sendMessageUploadRoundAction';
  progress?: number;
};
export type speakingInGroupCallAction = {
  _: 'speakingInGroupCallAction';
};
export type sendMessageHistoryImportAction = {
  _: 'sendMessageHistoryImportAction';
  progress?: number;
};
export type sendMessageChooseStickerAction = {
  _: 'sendMessageChooseStickerAction';
};
export type sendMessageEmojiInteraction = {
  _: 'sendMessageEmojiInteraction';
  emoticon?: string;
  msg_id?: number;
  interaction: DataJSON;
};
export type sendMessageEmojiInteractionSeen = {
  _: 'sendMessageEmojiInteractionSeen';
  emoticon?: string;
};
export type SendMessageAction = sendMessageTypingAction | sendMessageCancelAction | sendMessageRecordVideoAction | sendMessageUploadVideoAction | sendMessageRecordAudioAction | sendMessageUploadAudioAction | sendMessageUploadPhotoAction | sendMessageUploadDocumentAction | sendMessageGeoLocationAction | sendMessageChooseContactAction | sendMessageGamePlayAction | sendMessageRecordRoundAction | sendMessageUploadRoundAction | speakingInGroupCallAction | sendMessageHistoryImportAction | sendMessageChooseStickerAction | sendMessageEmojiInteraction | sendMessageEmojiInteractionSeen;

export type contacts_found = {
  _: 'contacts.found';
  my_results: Array<Peer>;
  results: Array<Peer>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type contacts_Found = contacts_found;

export type inputPrivacyKeyStatusTimestamp = {
  _: 'inputPrivacyKeyStatusTimestamp';
};
export type inputPrivacyKeyChatInvite = {
  _: 'inputPrivacyKeyChatInvite';
};
export type inputPrivacyKeyPhoneCall = {
  _: 'inputPrivacyKeyPhoneCall';
};
export type inputPrivacyKeyPhoneP2P = {
  _: 'inputPrivacyKeyPhoneP2P';
};
export type inputPrivacyKeyForwards = {
  _: 'inputPrivacyKeyForwards';
};
export type inputPrivacyKeyProfilePhoto = {
  _: 'inputPrivacyKeyProfilePhoto';
};
export type inputPrivacyKeyPhoneNumber = {
  _: 'inputPrivacyKeyPhoneNumber';
};
export type inputPrivacyKeyAddedByPhone = {
  _: 'inputPrivacyKeyAddedByPhone';
};
export type inputPrivacyKeyVoiceMessages = {
  _: 'inputPrivacyKeyVoiceMessages';
};
export type InputPrivacyKey = inputPrivacyKeyStatusTimestamp | inputPrivacyKeyChatInvite | inputPrivacyKeyPhoneCall | inputPrivacyKeyPhoneP2P | inputPrivacyKeyForwards | inputPrivacyKeyProfilePhoto | inputPrivacyKeyPhoneNumber | inputPrivacyKeyAddedByPhone | inputPrivacyKeyVoiceMessages;

export type privacyKeyStatusTimestamp = {
  _: 'privacyKeyStatusTimestamp';
};
export type privacyKeyChatInvite = {
  _: 'privacyKeyChatInvite';
};
export type privacyKeyPhoneCall = {
  _: 'privacyKeyPhoneCall';
};
export type privacyKeyPhoneP2P = {
  _: 'privacyKeyPhoneP2P';
};
export type privacyKeyForwards = {
  _: 'privacyKeyForwards';
};
export type privacyKeyProfilePhoto = {
  _: 'privacyKeyProfilePhoto';
};
export type privacyKeyPhoneNumber = {
  _: 'privacyKeyPhoneNumber';
};
export type privacyKeyAddedByPhone = {
  _: 'privacyKeyAddedByPhone';
};
export type privacyKeyVoiceMessages = {
  _: 'privacyKeyVoiceMessages';
};
export type PrivacyKey = privacyKeyStatusTimestamp | privacyKeyChatInvite | privacyKeyPhoneCall | privacyKeyPhoneP2P | privacyKeyForwards | privacyKeyProfilePhoto | privacyKeyPhoneNumber | privacyKeyAddedByPhone | privacyKeyVoiceMessages;

export type inputPrivacyValueAllowContacts = {
  _: 'inputPrivacyValueAllowContacts';
};
export type inputPrivacyValueAllowAll = {
  _: 'inputPrivacyValueAllowAll';
};
export type inputPrivacyValueAllowUsers = {
  _: 'inputPrivacyValueAllowUsers';
  users: Array<InputUser>;
};
export type inputPrivacyValueDisallowContacts = {
  _: 'inputPrivacyValueDisallowContacts';
};
export type inputPrivacyValueDisallowAll = {
  _: 'inputPrivacyValueDisallowAll';
};
export type inputPrivacyValueDisallowUsers = {
  _: 'inputPrivacyValueDisallowUsers';
  users: Array<InputUser>;
};
export type inputPrivacyValueAllowChatParticipants = {
  _: 'inputPrivacyValueAllowChatParticipants';
  chats?: Array<number>;
};
export type inputPrivacyValueDisallowChatParticipants = {
  _: 'inputPrivacyValueDisallowChatParticipants';
  chats?: Array<number>;
};
export type InputPrivacyRule = inputPrivacyValueAllowContacts | inputPrivacyValueAllowAll | inputPrivacyValueAllowUsers | inputPrivacyValueDisallowContacts | inputPrivacyValueDisallowAll | inputPrivacyValueDisallowUsers | inputPrivacyValueAllowChatParticipants | inputPrivacyValueDisallowChatParticipants;

export type privacyValueAllowContacts = {
  _: 'privacyValueAllowContacts';
};
export type privacyValueAllowAll = {
  _: 'privacyValueAllowAll';
};
export type privacyValueAllowUsers = {
  _: 'privacyValueAllowUsers';
  users?: Array<number>;
};
export type privacyValueDisallowContacts = {
  _: 'privacyValueDisallowContacts';
};
export type privacyValueDisallowAll = {
  _: 'privacyValueDisallowAll';
};
export type privacyValueDisallowUsers = {
  _: 'privacyValueDisallowUsers';
  users?: Array<number>;
};
export type privacyValueAllowChatParticipants = {
  _: 'privacyValueAllowChatParticipants';
  chats?: Array<number>;
};
export type privacyValueDisallowChatParticipants = {
  _: 'privacyValueDisallowChatParticipants';
  chats?: Array<number>;
};
export type PrivacyRule = privacyValueAllowContacts | privacyValueAllowAll | privacyValueAllowUsers | privacyValueDisallowContacts | privacyValueDisallowAll | privacyValueDisallowUsers | privacyValueAllowChatParticipants | privacyValueDisallowChatParticipants;

export type account_privacyRules = {
  _: 'account.privacyRules';
  rules: Array<PrivacyRule>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type account_PrivacyRules = account_privacyRules;

export type accountDaysTTL = {
  _: 'accountDaysTTL';
  days?: number;
};
export type AccountDaysTTL = accountDaysTTL;

export type documentAttributeImageSize = {
  _: 'documentAttributeImageSize';
  w?: number;
  h?: number;
};
export type documentAttributeAnimated = {
  _: 'documentAttributeAnimated';
};
export type documentAttributeSticker = {
  _: 'documentAttributeSticker';
  flags?: number;
  mask?: boolean;
  alt?: string;
  stickerset: InputStickerSet;
  mask_coords?: MaskCoords;
};
export type documentAttributeVideo = {
  _: 'documentAttributeVideo';
  flags?: number;
  round_message?: boolean;
  supports_streaming?: boolean;
  duration?: number;
  w?: number;
  h?: number;
};
export type documentAttributeAudio = {
  _: 'documentAttributeAudio';
  flags?: number;
  voice?: boolean;
  duration?: number;
  title?: string;
  performer?: string;
  waveform?: Uint8Array;
};
export type documentAttributeFilename = {
  _: 'documentAttributeFilename';
  file_name?: string;
};
export type documentAttributeHasStickers = {
  _: 'documentAttributeHasStickers';
};
export type documentAttributeCustomEmoji = {
  _: 'documentAttributeCustomEmoji';
  flags?: number;
  free?: boolean;
  text_color?: boolean;
  alt?: string;
  stickerset: InputStickerSet;
};
export type DocumentAttribute = documentAttributeImageSize | documentAttributeAnimated | documentAttributeSticker | documentAttributeVideo | documentAttributeAudio | documentAttributeFilename | documentAttributeHasStickers | documentAttributeCustomEmoji;

export type messages_stickersNotModified = {
  _: 'messages.stickersNotModified';
};
export type messages_stickers = {
  _: 'messages.stickers';
  hash?: number;
  stickers: Array<Document>;
};
export type messages_Stickers = messages_stickersNotModified | messages_stickers;

export type stickerPack = {
  _: 'stickerPack';
  emoticon?: string;
  documents?: Array<number>;
};
export type StickerPack = stickerPack;

export type messages_allStickersNotModified = {
  _: 'messages.allStickersNotModified';
};
export type messages_allStickers = {
  _: 'messages.allStickers';
  hash?: number;
  sets: Array<StickerSet>;
};
export type messages_AllStickers = messages_allStickersNotModified | messages_allStickers;

export type messages_affectedMessages = {
  _: 'messages.affectedMessages';
  pts?: number;
  pts_count?: number;
};
export type messages_AffectedMessages = messages_affectedMessages;

export type webPageEmpty = {
  _: 'webPageEmpty';
  id?: number;
};
export type webPagePending = {
  _: 'webPagePending';
  id?: number;
  date?: number;
};
export type webPage = {
  _: 'webPage';
  flags?: number;
  id?: number;
  url?: string;
  display_url?: string;
  hash?: number;
  type?: string;
  site_name?: string;
  title?: string;
  description?: string;
  photo?: Photo;
  embed_url?: string;
  embed_type?: string;
  embed_width?: number;
  embed_height?: number;
  duration?: number;
  author?: string;
  document?: Document;
  cached_page?: Page;
  attributes?: Array<WebPageAttribute>;
};
export type webPageNotModified = {
  _: 'webPageNotModified';
  flags?: number;
  cached_page_views?: number;
};
export type WebPage = webPageEmpty | webPagePending | webPage | webPageNotModified;

export type authorization = {
  _: 'authorization';
  flags?: number;
  current?: boolean;
  official_app?: boolean;
  password_pending?: boolean;
  encrypted_requests_disabled?: boolean;
  call_requests_disabled?: boolean;
  hash?: number;
  device_model?: string;
  platform?: string;
  system_version?: string;
  api_id?: number;
  app_name?: string;
  app_version?: string;
  date_created?: number;
  date_active?: number;
  ip?: string;
  country?: string;
  region?: string;
};
export type Authorization = authorization;

export type account_authorizations = {
  _: 'account.authorizations';
  authorization_ttl_days?: number;
  authorizations: Array<Authorization>;
};
export type account_Authorizations = account_authorizations;

export type account_password = {
  _: 'account.password';
  flags?: number;
  has_recovery?: boolean;
  has_secure_values?: boolean;
  has_password?: boolean;
  current_algo?: PasswordKdfAlgo;
  srp_B?: Uint8Array;
  srp_id?: number;
  hint?: string;
  email_unconfirmed_pattern?: string;
  new_algo: PasswordKdfAlgo;
  new_secure_algo: SecurePasswordKdfAlgo;
  secure_random?: Uint8Array;
  pending_reset_date?: number;
  login_email_pattern?: string;
};
export type account_Password = account_password;

export type account_passwordSettings = {
  _: 'account.passwordSettings';
  flags?: number;
  email?: string;
  secure_settings?: SecureSecretSettings;
};
export type account_PasswordSettings = account_passwordSettings;

export type account_passwordInputSettings = {
  _: 'account.passwordInputSettings';
  flags?: number;
  new_algo?: PasswordKdfAlgo;
  new_password_hash?: Uint8Array;
  hint?: string;
  email?: string;
  new_secure_settings?: SecureSecretSettings;
};
export type account_PasswordInputSettings = account_passwordInputSettings;

export type auth_passwordRecovery = {
  _: 'auth.passwordRecovery';
  email_pattern?: string;
};
export type auth_PasswordRecovery = auth_passwordRecovery;

export type receivedNotifyMessage = {
  _: 'receivedNotifyMessage';
  id?: number;
  flags?: number;
};
export type ReceivedNotifyMessage = receivedNotifyMessage;

export type chatInviteExported = {
  _: 'chatInviteExported';
  flags?: number;
  revoked?: boolean;
  permanent?: boolean;
  request_needed?: boolean;
  link?: string;
  admin_id?: number;
  date?: number;
  start_date?: number;
  expire_date?: number;
  usage_limit?: number;
  usage?: number;
  requested?: number;
  title?: string;
};
export type chatInvitePublicJoinRequests = {
  _: 'chatInvitePublicJoinRequests';
};
export type ExportedChatInvite = chatInviteExported | chatInvitePublicJoinRequests;

export type chatInviteAlready = {
  _: 'chatInviteAlready';
  chat: Chat;
};
export type chatInvite = {
  _: 'chatInvite';
  flags?: number;
  channel?: boolean;
  broadcast?: boolean;
  public?: boolean;
  megagroup?: boolean;
  request_needed?: boolean;
  title?: string;
  about?: string;
  photo: Photo;
  participants_count?: number;
  participants?: Array<User>;
};
export type chatInvitePeek = {
  _: 'chatInvitePeek';
  chat: Chat;
  expires?: number;
};
export type ChatInvite = chatInviteAlready | chatInvite | chatInvitePeek;

export type inputStickerSetEmpty = {
  _: 'inputStickerSetEmpty';
};
export type inputStickerSetID = {
  _: 'inputStickerSetID';
  id?: number;
  access_hash?: number;
};
export type inputStickerSetShortName = {
  _: 'inputStickerSetShortName';
  short_name?: string;
};
export type inputStickerSetAnimatedEmoji = {
  _: 'inputStickerSetAnimatedEmoji';
};
export type inputStickerSetDice = {
  _: 'inputStickerSetDice';
  emoticon?: string;
};
export type inputStickerSetAnimatedEmojiAnimations = {
  _: 'inputStickerSetAnimatedEmojiAnimations';
};
export type inputStickerSetPremiumGifts = {
  _: 'inputStickerSetPremiumGifts';
};
export type inputStickerSetEmojiGenericAnimations = {
  _: 'inputStickerSetEmojiGenericAnimations';
};
export type inputStickerSetEmojiDefaultStatuses = {
  _: 'inputStickerSetEmojiDefaultStatuses';
};
export type inputStickerSetEmojiDefaultTopicIcons = {
  _: 'inputStickerSetEmojiDefaultTopicIcons';
};
export type InputStickerSet = inputStickerSetEmpty | inputStickerSetID | inputStickerSetShortName | inputStickerSetAnimatedEmoji | inputStickerSetDice | inputStickerSetAnimatedEmojiAnimations | inputStickerSetPremiumGifts | inputStickerSetEmojiGenericAnimations | inputStickerSetEmojiDefaultStatuses | inputStickerSetEmojiDefaultTopicIcons;

export type stickerSet = {
  _: 'stickerSet';
  flags?: number;
  archived?: boolean;
  official?: boolean;
  masks?: boolean;
  animated?: boolean;
  videos?: boolean;
  emojis?: boolean;
  installed_date?: number;
  id?: number;
  access_hash?: number;
  title?: string;
  short_name?: string;
  thumbs?: Array<PhotoSize>;
  thumb_dc_id?: number;
  thumb_version?: number;
  thumb_document_id?: number;
  count?: number;
  hash?: number;
};
export type StickerSet = stickerSet;

export type messages_stickerSet = {
  _: 'messages.stickerSet';
  set: StickerSet;
  packs: Array<StickerPack>;
  keywords: Array<StickerKeyword>;
  documents: Array<Document>;
};
export type messages_stickerSetNotModified = {
  _: 'messages.stickerSetNotModified';
};
export type messages_StickerSet = messages_stickerSet | messages_stickerSetNotModified;

export type botCommand = {
  _: 'botCommand';
  command?: string;
  description?: string;
};
export type BotCommand = botCommand;

export type botInfo = {
  _: 'botInfo';
  flags?: number;
  user_id?: number;
  description?: string;
  description_photo?: Photo;
  description_document?: Document;
  commands?: Array<BotCommand>;
  menu_button?: BotMenuButton;
};
export type BotInfo = botInfo;

export type keyboardButton = {
  _: 'keyboardButton';
  text?: string;
};
export type keyboardButtonUrl = {
  _: 'keyboardButtonUrl';
  text?: string;
  url?: string;
};
export type keyboardButtonCallback = {
  _: 'keyboardButtonCallback';
  flags?: number;
  requires_password?: boolean;
  text?: string;
  data?: Uint8Array;
};
export type keyboardButtonRequestPhone = {
  _: 'keyboardButtonRequestPhone';
  text?: string;
};
export type keyboardButtonRequestGeoLocation = {
  _: 'keyboardButtonRequestGeoLocation';
  text?: string;
};
export type keyboardButtonSwitchInline = {
  _: 'keyboardButtonSwitchInline';
  flags?: number;
  same_peer?: boolean;
  text?: string;
  query?: string;
  peer_types?: Array<InlineQueryPeerType>;
};
export type keyboardButtonGame = {
  _: 'keyboardButtonGame';
  text?: string;
};
export type keyboardButtonBuy = {
  _: 'keyboardButtonBuy';
  text?: string;
};
export type keyboardButtonUrlAuth = {
  _: 'keyboardButtonUrlAuth';
  flags?: number;
  text?: string;
  fwd_text?: string;
  url?: string;
  button_id?: number;
};
export type inputKeyboardButtonUrlAuth = {
  _: 'inputKeyboardButtonUrlAuth';
  flags?: number;
  request_write_access?: boolean;
  text?: string;
  fwd_text?: string;
  url?: string;
  bot: InputUser;
};
export type keyboardButtonRequestPoll = {
  _: 'keyboardButtonRequestPoll';
  flags?: number;
  quiz?: boolean;
  text?: string;
};
export type inputKeyboardButtonUserProfile = {
  _: 'inputKeyboardButtonUserProfile';
  text?: string;
  user_id: InputUser;
};
export type keyboardButtonUserProfile = {
  _: 'keyboardButtonUserProfile';
  text?: string;
  user_id?: number;
};
export type keyboardButtonWebView = {
  _: 'keyboardButtonWebView';
  text?: string;
  url?: string;
};
export type keyboardButtonSimpleWebView = {
  _: 'keyboardButtonSimpleWebView';
  text?: string;
  url?: string;
};
export type keyboardButtonRequestPeer = {
  _: 'keyboardButtonRequestPeer';
  text?: string;
  button_id?: number;
  peer_type: RequestPeerType;
};
export type KeyboardButton = keyboardButton | keyboardButtonUrl | keyboardButtonCallback | keyboardButtonRequestPhone | keyboardButtonRequestGeoLocation | keyboardButtonSwitchInline | keyboardButtonGame | keyboardButtonBuy | keyboardButtonUrlAuth | inputKeyboardButtonUrlAuth | keyboardButtonRequestPoll | inputKeyboardButtonUserProfile | keyboardButtonUserProfile | keyboardButtonWebView | keyboardButtonSimpleWebView | keyboardButtonRequestPeer;

export type keyboardButtonRow = {
  _: 'keyboardButtonRow';
  buttons: Array<KeyboardButton>;
};
export type KeyboardButtonRow = keyboardButtonRow;

export type replyKeyboardHide = {
  _: 'replyKeyboardHide';
  flags?: number;
  selective?: boolean;
};
export type replyKeyboardForceReply = {
  _: 'replyKeyboardForceReply';
  flags?: number;
  single_use?: boolean;
  selective?: boolean;
  placeholder?: string;
};
export type replyKeyboardMarkup = {
  _: 'replyKeyboardMarkup';
  flags?: number;
  resize?: boolean;
  single_use?: boolean;
  selective?: boolean;
  persistent?: boolean;
  rows: Array<KeyboardButtonRow>;
  placeholder?: string;
};
export type replyInlineMarkup = {
  _: 'replyInlineMarkup';
  rows: Array<KeyboardButtonRow>;
};
export type ReplyMarkup = replyKeyboardHide | replyKeyboardForceReply | replyKeyboardMarkup | replyInlineMarkup;

export type messageEntityUnknown = {
  _: 'messageEntityUnknown';
  offset?: number;
  length?: number;
};
export type messageEntityMention = {
  _: 'messageEntityMention';
  offset?: number;
  length?: number;
};
export type messageEntityHashtag = {
  _: 'messageEntityHashtag';
  offset?: number;
  length?: number;
};
export type messageEntityBotCommand = {
  _: 'messageEntityBotCommand';
  offset?: number;
  length?: number;
};
export type messageEntityUrl = {
  _: 'messageEntityUrl';
  offset?: number;
  length?: number;
};
export type messageEntityEmail = {
  _: 'messageEntityEmail';
  offset?: number;
  length?: number;
};
export type messageEntityBold = {
  _: 'messageEntityBold';
  offset?: number;
  length?: number;
};
export type messageEntityItalic = {
  _: 'messageEntityItalic';
  offset?: number;
  length?: number;
};
export type messageEntityCode = {
  _: 'messageEntityCode';
  offset?: number;
  length?: number;
};
export type messageEntityPre = {
  _: 'messageEntityPre';
  offset?: number;
  length?: number;
  language?: string;
};
export type messageEntityTextUrl = {
  _: 'messageEntityTextUrl';
  offset?: number;
  length?: number;
  url?: string;
};
export type messageEntityMentionName = {
  _: 'messageEntityMentionName';
  offset?: number;
  length?: number;
  user_id?: number;
};
export type inputMessageEntityMentionName = {
  _: 'inputMessageEntityMentionName';
  offset?: number;
  length?: number;
  user_id: InputUser;
};
export type messageEntityPhone = {
  _: 'messageEntityPhone';
  offset?: number;
  length?: number;
};
export type messageEntityCashtag = {
  _: 'messageEntityCashtag';
  offset?: number;
  length?: number;
};
export type messageEntityUnderline = {
  _: 'messageEntityUnderline';
  offset?: number;
  length?: number;
};
export type messageEntityStrike = {
  _: 'messageEntityStrike';
  offset?: number;
  length?: number;
};
export type messageEntityBlockquote = {
  _: 'messageEntityBlockquote';
  offset?: number;
  length?: number;
};
export type messageEntityBankCard = {
  _: 'messageEntityBankCard';
  offset?: number;
  length?: number;
};
export type messageEntitySpoiler = {
  _: 'messageEntitySpoiler';
  offset?: number;
  length?: number;
};
export type messageEntityCustomEmoji = {
  _: 'messageEntityCustomEmoji';
  offset?: number;
  length?: number;
  document_id?: number;
};
export type MessageEntity = messageEntityUnknown | messageEntityMention | messageEntityHashtag | messageEntityBotCommand | messageEntityUrl | messageEntityEmail | messageEntityBold | messageEntityItalic | messageEntityCode | messageEntityPre | messageEntityTextUrl | messageEntityMentionName | inputMessageEntityMentionName | messageEntityPhone | messageEntityCashtag | messageEntityUnderline | messageEntityStrike | messageEntityBlockquote | messageEntityBankCard | messageEntitySpoiler | messageEntityCustomEmoji;

export type inputChannelEmpty = {
  _: 'inputChannelEmpty';
};
export type inputChannel = {
  _: 'inputChannel';
  channel_id?: number;
  access_hash?: number;
};
export type inputChannelFromMessage = {
  _: 'inputChannelFromMessage';
  peer: InputPeer;
  msg_id?: number;
  channel_id?: number;
};
export type InputChannel = inputChannelEmpty | inputChannel | inputChannelFromMessage;

export type contacts_resolvedPeer = {
  _: 'contacts.resolvedPeer';
  peer: Peer;
  chats: Array<Chat>;
  users: Array<User>;
};
export type contacts_ResolvedPeer = contacts_resolvedPeer;

export type messageRange = {
  _: 'messageRange';
  min_id?: number;
  max_id?: number;
};
export type MessageRange = messageRange;

export type updates_channelDifferenceEmpty = {
  _: 'updates.channelDifferenceEmpty';
  flags?: number;
  final?: boolean;
  pts?: number;
  timeout?: number;
};
export type updates_channelDifferenceTooLong = {
  _: 'updates.channelDifferenceTooLong';
  flags?: number;
  final?: boolean;
  timeout?: number;
  dialog: Dialog;
  messages: Array<Message>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type updates_channelDifference = {
  _: 'updates.channelDifference';
  flags?: number;
  final?: boolean;
  pts?: number;
  timeout?: number;
  new_messages: Array<Message>;
  other_updates: Array<Update>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type updates_ChannelDifference = updates_channelDifferenceEmpty | updates_channelDifferenceTooLong | updates_channelDifference;

export type channelMessagesFilterEmpty = {
  _: 'channelMessagesFilterEmpty';
};
export type channelMessagesFilter = {
  _: 'channelMessagesFilter';
  flags?: number;
  exclude_new_messages?: boolean;
  ranges: Array<MessageRange>;
};
export type ChannelMessagesFilter = channelMessagesFilterEmpty | channelMessagesFilter;

export type channelParticipant = {
  _: 'channelParticipant';
  user_id?: number;
  date?: number;
};
export type channelParticipantSelf = {
  _: 'channelParticipantSelf';
  flags?: number;
  via_request?: boolean;
  user_id?: number;
  inviter_id?: number;
  date?: number;
};
export type channelParticipantCreator = {
  _: 'channelParticipantCreator';
  flags?: number;
  user_id?: number;
  admin_rights: ChatAdminRights;
  rank?: string;
};
export type channelParticipantAdmin = {
  _: 'channelParticipantAdmin';
  flags?: number;
  can_edit?: boolean;
  self?: boolean;
  user_id?: number;
  inviter_id?: number;
  promoted_by?: number;
  date?: number;
  admin_rights: ChatAdminRights;
  rank?: string;
};
export type channelParticipantBanned = {
  _: 'channelParticipantBanned';
  flags?: number;
  left?: boolean;
  peer: Peer;
  kicked_by?: number;
  date?: number;
  banned_rights: ChatBannedRights;
};
export type channelParticipantLeft = {
  _: 'channelParticipantLeft';
  peer: Peer;
};
export type ChannelParticipant = channelParticipant | channelParticipantSelf | channelParticipantCreator | channelParticipantAdmin | channelParticipantBanned | channelParticipantLeft;

export type channelParticipantsRecent = {
  _: 'channelParticipantsRecent';
};
export type channelParticipantsAdmins = {
  _: 'channelParticipantsAdmins';
};
export type channelParticipantsKicked = {
  _: 'channelParticipantsKicked';
  q?: string;
};
export type channelParticipantsBots = {
  _: 'channelParticipantsBots';
};
export type channelParticipantsBanned = {
  _: 'channelParticipantsBanned';
  q?: string;
};
export type channelParticipantsSearch = {
  _: 'channelParticipantsSearch';
  q?: string;
};
export type channelParticipantsContacts = {
  _: 'channelParticipantsContacts';
  q?: string;
};
export type channelParticipantsMentions = {
  _: 'channelParticipantsMentions';
  flags?: number;
  q?: string;
  top_msg_id?: number;
};
export type ChannelParticipantsFilter = channelParticipantsRecent | channelParticipantsAdmins | channelParticipantsKicked | channelParticipantsBots | channelParticipantsBanned | channelParticipantsSearch | channelParticipantsContacts | channelParticipantsMentions;

export type channels_channelParticipants = {
  _: 'channels.channelParticipants';
  count?: number;
  participants: Array<ChannelParticipant>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type channels_channelParticipantsNotModified = {
  _: 'channels.channelParticipantsNotModified';
};
export type channels_ChannelParticipants = channels_channelParticipants | channels_channelParticipantsNotModified;

export type channels_channelParticipant = {
  _: 'channels.channelParticipant';
  participant: ChannelParticipant;
  chats: Array<Chat>;
  users: Array<User>;
};
export type channels_ChannelParticipant = channels_channelParticipant;

export type help_termsOfService = {
  _: 'help.termsOfService';
  flags?: number;
  popup?: boolean;
  id: DataJSON;
  text?: string;
  entities: Array<MessageEntity>;
  min_age_confirm?: number;
};
export type help_TermsOfService = help_termsOfService;

export type messages_savedGifsNotModified = {
  _: 'messages.savedGifsNotModified';
};
export type messages_savedGifs = {
  _: 'messages.savedGifs';
  hash?: number;
  gifs: Array<Document>;
};
export type messages_SavedGifs = messages_savedGifsNotModified | messages_savedGifs;

export type inputBotInlineMessageMediaAuto = {
  _: 'inputBotInlineMessageMediaAuto';
  flags?: number;
  message?: string;
  entities?: Array<MessageEntity>;
  reply_markup?: ReplyMarkup;
};
export type inputBotInlineMessageText = {
  _: 'inputBotInlineMessageText';
  flags?: number;
  no_webpage?: boolean;
  message?: string;
  entities?: Array<MessageEntity>;
  reply_markup?: ReplyMarkup;
};
export type inputBotInlineMessageMediaGeo = {
  _: 'inputBotInlineMessageMediaGeo';
  flags?: number;
  geo_point: InputGeoPoint;
  heading?: number;
  period?: number;
  proximity_notification_radius?: number;
  reply_markup?: ReplyMarkup;
};
export type inputBotInlineMessageMediaVenue = {
  _: 'inputBotInlineMessageMediaVenue';
  flags?: number;
  geo_point: InputGeoPoint;
  title?: string;
  address?: string;
  provider?: string;
  venue_id?: string;
  venue_type?: string;
  reply_markup?: ReplyMarkup;
};
export type inputBotInlineMessageMediaContact = {
  _: 'inputBotInlineMessageMediaContact';
  flags?: number;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  vcard?: string;
  reply_markup?: ReplyMarkup;
};
export type inputBotInlineMessageGame = {
  _: 'inputBotInlineMessageGame';
  flags?: number;
  reply_markup?: ReplyMarkup;
};
export type inputBotInlineMessageMediaInvoice = {
  _: 'inputBotInlineMessageMediaInvoice';
  flags?: number;
  title?: string;
  description?: string;
  photo?: InputWebDocument;
  invoice: Invoice;
  payload?: Uint8Array;
  provider?: string;
  provider_data: DataJSON;
  reply_markup?: ReplyMarkup;
};
export type InputBotInlineMessage = inputBotInlineMessageMediaAuto | inputBotInlineMessageText | inputBotInlineMessageMediaGeo | inputBotInlineMessageMediaVenue | inputBotInlineMessageMediaContact | inputBotInlineMessageGame | inputBotInlineMessageMediaInvoice;

export type inputBotInlineResult = {
  _: 'inputBotInlineResult';
  flags?: number;
  id?: string;
  type?: string;
  title?: string;
  description?: string;
  url?: string;
  thumb?: InputWebDocument;
  content?: InputWebDocument;
  send_message: InputBotInlineMessage;
};
export type inputBotInlineResultPhoto = {
  _: 'inputBotInlineResultPhoto';
  id?: string;
  type?: string;
  photo: InputPhoto;
  send_message: InputBotInlineMessage;
};
export type inputBotInlineResultDocument = {
  _: 'inputBotInlineResultDocument';
  flags?: number;
  id?: string;
  type?: string;
  title?: string;
  description?: string;
  document: InputDocument;
  send_message: InputBotInlineMessage;
};
export type inputBotInlineResultGame = {
  _: 'inputBotInlineResultGame';
  id?: string;
  short_name?: string;
  send_message: InputBotInlineMessage;
};
export type InputBotInlineResult = inputBotInlineResult | inputBotInlineResultPhoto | inputBotInlineResultDocument | inputBotInlineResultGame;

export type botInlineMessageMediaAuto = {
  _: 'botInlineMessageMediaAuto';
  flags?: number;
  message?: string;
  entities?: Array<MessageEntity>;
  reply_markup?: ReplyMarkup;
};
export type botInlineMessageText = {
  _: 'botInlineMessageText';
  flags?: number;
  no_webpage?: boolean;
  message?: string;
  entities?: Array<MessageEntity>;
  reply_markup?: ReplyMarkup;
};
export type botInlineMessageMediaGeo = {
  _: 'botInlineMessageMediaGeo';
  flags?: number;
  geo: GeoPoint;
  heading?: number;
  period?: number;
  proximity_notification_radius?: number;
  reply_markup?: ReplyMarkup;
};
export type botInlineMessageMediaVenue = {
  _: 'botInlineMessageMediaVenue';
  flags?: number;
  geo: GeoPoint;
  title?: string;
  address?: string;
  provider?: string;
  venue_id?: string;
  venue_type?: string;
  reply_markup?: ReplyMarkup;
};
export type botInlineMessageMediaContact = {
  _: 'botInlineMessageMediaContact';
  flags?: number;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  vcard?: string;
  reply_markup?: ReplyMarkup;
};
export type botInlineMessageMediaInvoice = {
  _: 'botInlineMessageMediaInvoice';
  flags?: number;
  shipping_address_requested?: boolean;
  test?: boolean;
  title?: string;
  description?: string;
  photo?: WebDocument;
  currency?: string;
  total_amount?: number;
  reply_markup?: ReplyMarkup;
};
export type BotInlineMessage = botInlineMessageMediaAuto | botInlineMessageText | botInlineMessageMediaGeo | botInlineMessageMediaVenue | botInlineMessageMediaContact | botInlineMessageMediaInvoice;

export type botInlineResult = {
  _: 'botInlineResult';
  flags?: number;
  id?: string;
  type?: string;
  title?: string;
  description?: string;
  url?: string;
  thumb?: WebDocument;
  content?: WebDocument;
  send_message: BotInlineMessage;
};
export type botInlineMediaResult = {
  _: 'botInlineMediaResult';
  flags?: number;
  id?: string;
  type?: string;
  photo?: Photo;
  document?: Document;
  title?: string;
  description?: string;
  send_message: BotInlineMessage;
};
export type BotInlineResult = botInlineResult | botInlineMediaResult;

export type messages_botResults = {
  _: 'messages.botResults';
  flags?: number;
  gallery?: boolean;
  query_id?: number;
  next_offset?: string;
  switch_pm?: InlineBotSwitchPM;
  switch_webview?: InlineBotWebView;
  results: Array<BotInlineResult>;
  cache_time?: number;
  users: Array<User>;
};
export type messages_BotResults = messages_botResults;

export type exportedMessageLink = {
  _: 'exportedMessageLink';
  link?: string;
  html?: string;
};
export type ExportedMessageLink = exportedMessageLink;

export type messageFwdHeader = {
  _: 'messageFwdHeader';
  flags?: number;
  imported?: boolean;
  from_id?: Peer;
  from_name?: string;
  date?: number;
  channel_post?: number;
  post_author?: string;
  saved_from_peer?: Peer;
  saved_from_msg_id?: number;
  psa_type?: string;
};
export type MessageFwdHeader = messageFwdHeader;

export type auth_codeTypeSms = {
  _: 'auth.codeTypeSms';
};
export type auth_codeTypeCall = {
  _: 'auth.codeTypeCall';
};
export type auth_codeTypeFlashCall = {
  _: 'auth.codeTypeFlashCall';
};
export type auth_codeTypeMissedCall = {
  _: 'auth.codeTypeMissedCall';
};
export type auth_codeTypeFragmentSms = {
  _: 'auth.codeTypeFragmentSms';
};
export type auth_CodeType = auth_codeTypeSms | auth_codeTypeCall | auth_codeTypeFlashCall | auth_codeTypeMissedCall | auth_codeTypeFragmentSms;

export type auth_sentCodeTypeApp = {
  _: 'auth.sentCodeTypeApp';
  length?: number;
};
export type auth_sentCodeTypeSms = {
  _: 'auth.sentCodeTypeSms';
  length?: number;
};
export type auth_sentCodeTypeCall = {
  _: 'auth.sentCodeTypeCall';
  length?: number;
};
export type auth_sentCodeTypeFlashCall = {
  _: 'auth.sentCodeTypeFlashCall';
  pattern?: string;
};
export type auth_sentCodeTypeMissedCall = {
  _: 'auth.sentCodeTypeMissedCall';
  prefix?: string;
  length?: number;
};
export type auth_sentCodeTypeEmailCode = {
  _: 'auth.sentCodeTypeEmailCode';
  flags?: number;
  apple_signin_allowed?: boolean;
  google_signin_allowed?: boolean;
  email_pattern?: string;
  length?: number;
  reset_available_period?: number;
  reset_pending_date?: number;
};
export type auth_sentCodeTypeSetUpEmailRequired = {
  _: 'auth.sentCodeTypeSetUpEmailRequired';
  flags?: number;
  apple_signin_allowed?: boolean;
  google_signin_allowed?: boolean;
};
export type auth_sentCodeTypeFragmentSms = {
  _: 'auth.sentCodeTypeFragmentSms';
  url?: string;
  length?: number;
};
export type auth_sentCodeTypeFirebaseSms = {
  _: 'auth.sentCodeTypeFirebaseSms';
  flags?: number;
  nonce?: Uint8Array;
  receipt?: string;
  push_timeout?: number;
  length?: number;
};
export type auth_SentCodeType = auth_sentCodeTypeApp | auth_sentCodeTypeSms | auth_sentCodeTypeCall | auth_sentCodeTypeFlashCall | auth_sentCodeTypeMissedCall | auth_sentCodeTypeEmailCode | auth_sentCodeTypeSetUpEmailRequired | auth_sentCodeTypeFragmentSms | auth_sentCodeTypeFirebaseSms;

export type messages_botCallbackAnswer = {
  _: 'messages.botCallbackAnswer';
  flags?: number;
  alert?: boolean;
  has_url?: boolean;
  native_ui?: boolean;
  message?: string;
  url?: string;
  cache_time?: number;
};
export type messages_BotCallbackAnswer = messages_botCallbackAnswer;

export type messages_messageEditData = {
  _: 'messages.messageEditData';
  flags?: number;
  caption?: boolean;
};
export type messages_MessageEditData = messages_messageEditData;

export type inputBotInlineMessageID = {
  _: 'inputBotInlineMessageID';
  dc_id?: number;
  id?: number;
  access_hash?: number;
};
export type inputBotInlineMessageID64 = {
  _: 'inputBotInlineMessageID64';
  dc_id?: number;
  owner_id?: number;
  id?: number;
  access_hash?: number;
};
export type InputBotInlineMessageID = inputBotInlineMessageID | inputBotInlineMessageID64;

export type inlineBotSwitchPM = {
  _: 'inlineBotSwitchPM';
  text?: string;
  start_param?: string;
};
export type InlineBotSwitchPM = inlineBotSwitchPM;

export type messages_peerDialogs = {
  _: 'messages.peerDialogs';
  dialogs: Array<Dialog>;
  messages: Array<Message>;
  chats: Array<Chat>;
  users: Array<User>;
  state: updates_State;
};
export type messages_PeerDialogs = messages_peerDialogs;

export type topPeer = {
  _: 'topPeer';
  peer: Peer;
  rating?: number;
};
export type TopPeer = topPeer;

export type topPeerCategoryBotsPM = {
  _: 'topPeerCategoryBotsPM';
};
export type topPeerCategoryBotsInline = {
  _: 'topPeerCategoryBotsInline';
};
export type topPeerCategoryCorrespondents = {
  _: 'topPeerCategoryCorrespondents';
};
export type topPeerCategoryGroups = {
  _: 'topPeerCategoryGroups';
};
export type topPeerCategoryChannels = {
  _: 'topPeerCategoryChannels';
};
export type topPeerCategoryPhoneCalls = {
  _: 'topPeerCategoryPhoneCalls';
};
export type topPeerCategoryForwardUsers = {
  _: 'topPeerCategoryForwardUsers';
};
export type topPeerCategoryForwardChats = {
  _: 'topPeerCategoryForwardChats';
};
export type TopPeerCategory = topPeerCategoryBotsPM | topPeerCategoryBotsInline | topPeerCategoryCorrespondents | topPeerCategoryGroups | topPeerCategoryChannels | topPeerCategoryPhoneCalls | topPeerCategoryForwardUsers | topPeerCategoryForwardChats;

export type topPeerCategoryPeers = {
  _: 'topPeerCategoryPeers';
  category: TopPeerCategory;
  count?: number;
  peers: Array<TopPeer>;
};
export type TopPeerCategoryPeers = topPeerCategoryPeers;

export type contacts_topPeersNotModified = {
  _: 'contacts.topPeersNotModified';
};
export type contacts_topPeers = {
  _: 'contacts.topPeers';
  categories: Array<TopPeerCategoryPeers>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type contacts_topPeersDisabled = {
  _: 'contacts.topPeersDisabled';
};
export type contacts_TopPeers = contacts_topPeersNotModified | contacts_topPeers | contacts_topPeersDisabled;

export type draftMessageEmpty = {
  _: 'draftMessageEmpty';
  flags?: number;
  date?: number;
};
export type draftMessage = {
  _: 'draftMessage';
  flags?: number;
  no_webpage?: boolean;
  reply_to_msg_id?: number;
  message?: string;
  entities?: Array<MessageEntity>;
  date?: number;
};
export type DraftMessage = draftMessageEmpty | draftMessage;

export type messages_featuredStickersNotModified = {
  _: 'messages.featuredStickersNotModified';
  count?: number;
};
export type messages_featuredStickers = {
  _: 'messages.featuredStickers';
  flags?: number;
  premium?: boolean;
  hash?: number;
  count?: number;
  sets: Array<StickerSetCovered>;
  unread?: Array<number>;
};
export type messages_FeaturedStickers = messages_featuredStickersNotModified | messages_featuredStickers;

export type messages_recentStickersNotModified = {
  _: 'messages.recentStickersNotModified';
};
export type messages_recentStickers = {
  _: 'messages.recentStickers';
  hash?: number;
  packs: Array<StickerPack>;
  stickers: Array<Document>;
  dates?: Array<number>;
};
export type messages_RecentStickers = messages_recentStickersNotModified | messages_recentStickers;

export type messages_archivedStickers = {
  _: 'messages.archivedStickers';
  count?: number;
  sets: Array<StickerSetCovered>;
};
export type messages_ArchivedStickers = messages_archivedStickers;

export type messages_stickerSetInstallResultSuccess = {
  _: 'messages.stickerSetInstallResultSuccess';
};
export type messages_stickerSetInstallResultArchive = {
  _: 'messages.stickerSetInstallResultArchive';
  sets: Array<StickerSetCovered>;
};
export type messages_StickerSetInstallResult = messages_stickerSetInstallResultSuccess | messages_stickerSetInstallResultArchive;

export type stickerSetCovered = {
  _: 'stickerSetCovered';
  set: StickerSet;
  cover: Document;
};
export type stickerSetMultiCovered = {
  _: 'stickerSetMultiCovered';
  set: StickerSet;
  covers: Array<Document>;
};
export type stickerSetFullCovered = {
  _: 'stickerSetFullCovered';
  set: StickerSet;
  packs: Array<StickerPack>;
  keywords: Array<StickerKeyword>;
  documents: Array<Document>;
};
export type stickerSetNoCovered = {
  _: 'stickerSetNoCovered';
  set: StickerSet;
};
export type StickerSetCovered = stickerSetCovered | stickerSetMultiCovered | stickerSetFullCovered | stickerSetNoCovered;

export type maskCoords = {
  _: 'maskCoords';
  n?: number;
  x?: number;
  y?: number;
  zoom?: number;
};
export type MaskCoords = maskCoords;

export type inputStickeredMediaPhoto = {
  _: 'inputStickeredMediaPhoto';
  id: InputPhoto;
};
export type inputStickeredMediaDocument = {
  _: 'inputStickeredMediaDocument';
  id: InputDocument;
};
export type InputStickeredMedia = inputStickeredMediaPhoto | inputStickeredMediaDocument;

export type game = {
  _: 'game';
  flags?: number;
  id?: number;
  access_hash?: number;
  short_name?: string;
  title?: string;
  description?: string;
  photo: Photo;
  document?: Document;
};
export type Game = game;

export type inputGameID = {
  _: 'inputGameID';
  id?: number;
  access_hash?: number;
};
export type inputGameShortName = {
  _: 'inputGameShortName';
  bot_id: InputUser;
  short_name?: string;
};
export type InputGame = inputGameID | inputGameShortName;

export type highScore = {
  _: 'highScore';
  pos?: number;
  user_id?: number;
  score?: number;
};
export type HighScore = highScore;

export type messages_highScores = {
  _: 'messages.highScores';
  scores: Array<HighScore>;
  users: Array<User>;
};
export type messages_HighScores = messages_highScores;

export type textEmpty = {
  _: 'textEmpty';
};
export type textPlain = {
  _: 'textPlain';
  text?: string;
};
export type textBold = {
  _: 'textBold';
  text: RichText;
};
export type textItalic = {
  _: 'textItalic';
  text: RichText;
};
export type textUnderline = {
  _: 'textUnderline';
  text: RichText;
};
export type textStrike = {
  _: 'textStrike';
  text: RichText;
};
export type textFixed = {
  _: 'textFixed';
  text: RichText;
};
export type textUrl = {
  _: 'textUrl';
  text: RichText;
  url?: string;
  webpage_id?: number;
};
export type textEmail = {
  _: 'textEmail';
  text: RichText;
  email?: string;
};
export type textConcat = {
  _: 'textConcat';
  texts: Array<RichText>;
};
export type textSubscript = {
  _: 'textSubscript';
  text: RichText;
};
export type textSuperscript = {
  _: 'textSuperscript';
  text: RichText;
};
export type textMarked = {
  _: 'textMarked';
  text: RichText;
};
export type textPhone = {
  _: 'textPhone';
  text: RichText;
  phone?: string;
};
export type textImage = {
  _: 'textImage';
  document_id?: number;
  w?: number;
  h?: number;
};
export type textAnchor = {
  _: 'textAnchor';
  text: RichText;
  name?: string;
};
export type RichText = textEmpty | textPlain | textBold | textItalic | textUnderline | textStrike | textFixed | textUrl | textEmail | textConcat | textSubscript | textSuperscript | textMarked | textPhone | textImage | textAnchor;

export type pageBlockUnsupported = {
  _: 'pageBlockUnsupported';
};
export type pageBlockTitle = {
  _: 'pageBlockTitle';
  text: RichText;
};
export type pageBlockSubtitle = {
  _: 'pageBlockSubtitle';
  text: RichText;
};
export type pageBlockAuthorDate = {
  _: 'pageBlockAuthorDate';
  author: RichText;
  published_date?: number;
};
export type pageBlockHeader = {
  _: 'pageBlockHeader';
  text: RichText;
};
export type pageBlockSubheader = {
  _: 'pageBlockSubheader';
  text: RichText;
};
export type pageBlockParagraph = {
  _: 'pageBlockParagraph';
  text: RichText;
};
export type pageBlockPreformatted = {
  _: 'pageBlockPreformatted';
  text: RichText;
  language?: string;
};
export type pageBlockFooter = {
  _: 'pageBlockFooter';
  text: RichText;
};
export type pageBlockDivider = {
  _: 'pageBlockDivider';
};
export type pageBlockAnchor = {
  _: 'pageBlockAnchor';
  name?: string;
};
export type pageBlockList = {
  _: 'pageBlockList';
  items: Array<PageListItem>;
};
export type pageBlockBlockquote = {
  _: 'pageBlockBlockquote';
  text: RichText;
  caption: RichText;
};
export type pageBlockPullquote = {
  _: 'pageBlockPullquote';
  text: RichText;
  caption: RichText;
};
export type pageBlockPhoto = {
  _: 'pageBlockPhoto';
  flags?: number;
  photo_id?: number;
  caption: PageCaption;
  url?: string;
  webpage_id?: number;
};
export type pageBlockVideo = {
  _: 'pageBlockVideo';
  flags?: number;
  autoplay?: boolean;
  loop?: boolean;
  video_id?: number;
  caption: PageCaption;
};
export type pageBlockCover = {
  _: 'pageBlockCover';
  cover: PageBlock;
};
export type pageBlockEmbed = {
  _: 'pageBlockEmbed';
  flags?: number;
  full_width?: boolean;
  allow_scrolling?: boolean;
  url?: string;
  html?: string;
  poster_photo_id?: number;
  w?: number;
  h?: number;
  caption: PageCaption;
};
export type pageBlockEmbedPost = {
  _: 'pageBlockEmbedPost';
  url?: string;
  webpage_id?: number;
  author_photo_id?: number;
  author?: string;
  date?: number;
  blocks: Array<PageBlock>;
  caption: PageCaption;
};
export type pageBlockCollage = {
  _: 'pageBlockCollage';
  items: Array<PageBlock>;
  caption: PageCaption;
};
export type pageBlockSlideshow = {
  _: 'pageBlockSlideshow';
  items: Array<PageBlock>;
  caption: PageCaption;
};
export type pageBlockChannel = {
  _: 'pageBlockChannel';
  channel: Chat;
};
export type pageBlockAudio = {
  _: 'pageBlockAudio';
  audio_id?: number;
  caption: PageCaption;
};
export type pageBlockKicker = {
  _: 'pageBlockKicker';
  text: RichText;
};
export type pageBlockTable = {
  _: 'pageBlockTable';
  flags?: number;
  bordered?: boolean;
  striped?: boolean;
  title: RichText;
  rows: Array<PageTableRow>;
};
export type pageBlockOrderedList = {
  _: 'pageBlockOrderedList';
  items: Array<PageListOrderedItem>;
};
export type pageBlockDetails = {
  _: 'pageBlockDetails';
  flags?: number;
  open?: boolean;
  blocks: Array<PageBlock>;
  title: RichText;
};
export type pageBlockRelatedArticles = {
  _: 'pageBlockRelatedArticles';
  title: RichText;
  articles: Array<PageRelatedArticle>;
};
export type pageBlockMap = {
  _: 'pageBlockMap';
  geo: GeoPoint;
  zoom?: number;
  w?: number;
  h?: number;
  caption: PageCaption;
};
export type PageBlock = pageBlockUnsupported | pageBlockTitle | pageBlockSubtitle | pageBlockAuthorDate | pageBlockHeader | pageBlockSubheader | pageBlockParagraph | pageBlockPreformatted | pageBlockFooter | pageBlockDivider | pageBlockAnchor | pageBlockList | pageBlockBlockquote | pageBlockPullquote | pageBlockPhoto | pageBlockVideo | pageBlockCover | pageBlockEmbed | pageBlockEmbedPost | pageBlockCollage | pageBlockSlideshow | pageBlockChannel | pageBlockAudio | pageBlockKicker | pageBlockTable | pageBlockOrderedList | pageBlockDetails | pageBlockRelatedArticles | pageBlockMap;

export type phoneCallDiscardReasonMissed = {
  _: 'phoneCallDiscardReasonMissed';
};
export type phoneCallDiscardReasonDisconnect = {
  _: 'phoneCallDiscardReasonDisconnect';
};
export type phoneCallDiscardReasonHangup = {
  _: 'phoneCallDiscardReasonHangup';
};
export type phoneCallDiscardReasonBusy = {
  _: 'phoneCallDiscardReasonBusy';
};
export type PhoneCallDiscardReason = phoneCallDiscardReasonMissed | phoneCallDiscardReasonDisconnect | phoneCallDiscardReasonHangup | phoneCallDiscardReasonBusy;

export type dataJSON = {
  _: 'dataJSON';
  data?: string;
};
export type DataJSON = dataJSON;

export type labeledPrice = {
  _: 'labeledPrice';
  label?: string;
  amount?: number;
};
export type LabeledPrice = labeledPrice;

export type invoice = {
  _: 'invoice';
  flags?: number;
  test?: boolean;
  name_requested?: boolean;
  phone_requested?: boolean;
  email_requested?: boolean;
  shipping_address_requested?: boolean;
  flexible?: boolean;
  phone_to_provider?: boolean;
  email_to_provider?: boolean;
  recurring?: boolean;
  currency?: string;
  prices: Array<LabeledPrice>;
  max_tip_amount?: number;
  suggested_tip_amounts?: Array<number>;
  recurring_terms_url?: string;
};
export type Invoice = invoice;

export type paymentCharge = {
  _: 'paymentCharge';
  id?: string;
  provider_charge_id?: string;
};
export type PaymentCharge = paymentCharge;

export type postAddress = {
  _: 'postAddress';
  street_line1?: string;
  street_line2?: string;
  city?: string;
  state?: string;
  country_iso2?: string;
  post_code?: string;
};
export type PostAddress = postAddress;

export type paymentRequestedInfo = {
  _: 'paymentRequestedInfo';
  flags?: number;
  name?: string;
  phone?: string;
  email?: string;
  shipping_address?: PostAddress;
};
export type PaymentRequestedInfo = paymentRequestedInfo;

export type paymentSavedCredentialsCard = {
  _: 'paymentSavedCredentialsCard';
  id?: string;
  title?: string;
};
export type PaymentSavedCredentials = paymentSavedCredentialsCard;

export type webDocument = {
  _: 'webDocument';
  url?: string;
  access_hash?: number;
  size?: number;
  mime_type?: string;
  attributes: Array<DocumentAttribute>;
};
export type webDocumentNoProxy = {
  _: 'webDocumentNoProxy';
  url?: string;
  size?: number;
  mime_type?: string;
  attributes: Array<DocumentAttribute>;
};
export type WebDocument = webDocument | webDocumentNoProxy;

export type inputWebDocument = {
  _: 'inputWebDocument';
  url?: string;
  size?: number;
  mime_type?: string;
  attributes: Array<DocumentAttribute>;
};
export type InputWebDocument = inputWebDocument;

export type inputWebFileLocation = {
  _: 'inputWebFileLocation';
  url?: string;
  access_hash?: number;
};
export type inputWebFileGeoPointLocation = {
  _: 'inputWebFileGeoPointLocation';
  geo_point: InputGeoPoint;
  access_hash?: number;
  w?: number;
  h?: number;
  zoom?: number;
  scale?: number;
};
export type inputWebFileAudioAlbumThumbLocation = {
  _: 'inputWebFileAudioAlbumThumbLocation';
  flags?: number;
  small?: boolean;
  document?: InputDocument;
  title?: string;
  performer?: string;
};
export type InputWebFileLocation = inputWebFileLocation | inputWebFileGeoPointLocation | inputWebFileAudioAlbumThumbLocation;

export type upload_webFile = {
  _: 'upload.webFile';
  size?: number;
  mime_type?: string;
  file_type: storage_FileType;
  mtime?: number;
  bytes?: Uint8Array;
};
export type upload_WebFile = upload_webFile;

export type payments_paymentForm = {
  _: 'payments.paymentForm';
  flags?: number;
  can_save_credentials?: boolean;
  password_missing?: boolean;
  form_id?: number;
  bot_id?: number;
  title?: string;
  description?: string;
  photo?: WebDocument;
  invoice: Invoice;
  provider_id?: number;
  url?: string;
  native_provider?: string;
  native_params?: DataJSON;
  additional_methods?: Array<PaymentFormMethod>;
  saved_info?: PaymentRequestedInfo;
  saved_credentials?: Array<PaymentSavedCredentials>;
  users: Array<User>;
};
export type payments_PaymentForm = payments_paymentForm;

export type payments_validatedRequestedInfo = {
  _: 'payments.validatedRequestedInfo';
  flags?: number;
  id?: string;
  shipping_options?: Array<ShippingOption>;
};
export type payments_ValidatedRequestedInfo = payments_validatedRequestedInfo;

export type payments_paymentResult = {
  _: 'payments.paymentResult';
  updates: Updates;
};
export type payments_paymentVerificationNeeded = {
  _: 'payments.paymentVerificationNeeded';
  url?: string;
};
export type payments_PaymentResult = payments_paymentResult | payments_paymentVerificationNeeded;

export type payments_paymentReceipt = {
  _: 'payments.paymentReceipt';
  flags?: number;
  date?: number;
  bot_id?: number;
  provider_id?: number;
  title?: string;
  description?: string;
  photo?: WebDocument;
  invoice: Invoice;
  info?: PaymentRequestedInfo;
  shipping?: ShippingOption;
  tip_amount?: number;
  currency?: string;
  total_amount?: number;
  credentials_title?: string;
  users: Array<User>;
};
export type payments_PaymentReceipt = payments_paymentReceipt;

export type payments_savedInfo = {
  _: 'payments.savedInfo';
  flags?: number;
  has_saved_credentials?: boolean;
  saved_info?: PaymentRequestedInfo;
};
export type payments_SavedInfo = payments_savedInfo;

export type inputPaymentCredentialsSaved = {
  _: 'inputPaymentCredentialsSaved';
  id?: string;
  tmp_password?: Uint8Array;
};
export type inputPaymentCredentials = {
  _: 'inputPaymentCredentials';
  flags?: number;
  save?: boolean;
  data: DataJSON;
};
export type inputPaymentCredentialsApplePay = {
  _: 'inputPaymentCredentialsApplePay';
  payment_data: DataJSON;
};
export type inputPaymentCredentialsGooglePay = {
  _: 'inputPaymentCredentialsGooglePay';
  payment_token: DataJSON;
};
export type InputPaymentCredentials = inputPaymentCredentialsSaved | inputPaymentCredentials | inputPaymentCredentialsApplePay | inputPaymentCredentialsGooglePay;

export type account_tmpPassword = {
  _: 'account.tmpPassword';
  tmp_password?: Uint8Array;
  valid_until?: number;
};
export type account_TmpPassword = account_tmpPassword;

export type shippingOption = {
  _: 'shippingOption';
  id?: string;
  title?: string;
  prices: Array<LabeledPrice>;
};
export type ShippingOption = shippingOption;

export type inputStickerSetItem = {
  _: 'inputStickerSetItem';
  flags?: number;
  document: InputDocument;
  emoji?: string;
  mask_coords?: MaskCoords;
  keywords?: string;
};
export type InputStickerSetItem = inputStickerSetItem;

export type inputPhoneCall = {
  _: 'inputPhoneCall';
  id?: number;
  access_hash?: number;
};
export type InputPhoneCall = inputPhoneCall;

export type phoneCallEmpty = {
  _: 'phoneCallEmpty';
  id?: number;
};
export type phoneCallWaiting = {
  _: 'phoneCallWaiting';
  flags?: number;
  video?: boolean;
  id?: number;
  access_hash?: number;
  date?: number;
  admin_id?: number;
  participant_id?: number;
  protocol: PhoneCallProtocol;
  receive_date?: number;
};
export type phoneCallRequested = {
  _: 'phoneCallRequested';
  flags?: number;
  video?: boolean;
  id?: number;
  access_hash?: number;
  date?: number;
  admin_id?: number;
  participant_id?: number;
  g_a_hash?: Uint8Array;
  protocol: PhoneCallProtocol;
};
export type phoneCallAccepted = {
  _: 'phoneCallAccepted';
  flags?: number;
  video?: boolean;
  id?: number;
  access_hash?: number;
  date?: number;
  admin_id?: number;
  participant_id?: number;
  g_b?: Uint8Array;
  protocol: PhoneCallProtocol;
};
export type phoneCall = {
  _: 'phoneCall';
  flags?: number;
  p2p_allowed?: boolean;
  video?: boolean;
  id?: number;
  access_hash?: number;
  date?: number;
  admin_id?: number;
  participant_id?: number;
  g_a_or_b?: Uint8Array;
  key_fingerprint?: number;
  protocol: PhoneCallProtocol;
  connections: Array<PhoneConnection>;
  start_date?: number;
};
export type phoneCallDiscarded = {
  _: 'phoneCallDiscarded';
  flags?: number;
  need_rating?: boolean;
  need_debug?: boolean;
  video?: boolean;
  id?: number;
  reason?: PhoneCallDiscardReason;
  duration?: number;
};
export type PhoneCall = phoneCallEmpty | phoneCallWaiting | phoneCallRequested | phoneCallAccepted | phoneCall | phoneCallDiscarded;

export type phoneConnection = {
  _: 'phoneConnection';
  flags?: number;
  tcp?: boolean;
  id?: number;
  ip?: string;
  ipv6?: string;
  port?: number;
  peer_tag?: Uint8Array;
};
export type phoneConnectionWebrtc = {
  _: 'phoneConnectionWebrtc';
  flags?: number;
  turn?: boolean;
  stun?: boolean;
  id?: number;
  ip?: string;
  ipv6?: string;
  port?: number;
  username?: string;
  password?: string;
};
export type PhoneConnection = phoneConnection | phoneConnectionWebrtc;

export type phoneCallProtocol = {
  _: 'phoneCallProtocol';
  flags?: number;
  udp_p2p?: boolean;
  udp_reflector?: boolean;
  min_layer?: number;
  max_layer?: number;
  library_versions?: Array<string>;
};
export type PhoneCallProtocol = phoneCallProtocol;

export type phone_phoneCall = {
  _: 'phone.phoneCall';
  phone_call: PhoneCall;
  users: Array<User>;
};
export type phone_PhoneCall = phone_phoneCall;

export type upload_cdnFileReuploadNeeded = {
  _: 'upload.cdnFileReuploadNeeded';
  request_token?: Uint8Array;
};
export type upload_cdnFile = {
  _: 'upload.cdnFile';
  bytes?: Uint8Array;
};
export type upload_CdnFile = upload_cdnFileReuploadNeeded | upload_cdnFile;

export type cdnPublicKey = {
  _: 'cdnPublicKey';
  dc_id?: number;
  public_key?: string;
};
export type CdnPublicKey = cdnPublicKey;

export type cdnConfig = {
  _: 'cdnConfig';
  public_keys: Array<CdnPublicKey>;
};
export type CdnConfig = cdnConfig;

export type langPackString = {
  _: 'langPackString';
  key?: string;
  value?: string;
};
export type langPackStringPluralized = {
  _: 'langPackStringPluralized';
  flags?: number;
  key?: string;
  zero_value?: string;
  one_value?: string;
  two_value?: string;
  few_value?: string;
  many_value?: string;
  other_value?: string;
};
export type langPackStringDeleted = {
  _: 'langPackStringDeleted';
  key?: string;
};
export type LangPackString = langPackString | langPackStringPluralized | langPackStringDeleted;

export type langPackDifference = {
  _: 'langPackDifference';
  lang_code?: string;
  from_version?: number;
  version?: number;
  strings: Array<LangPackString>;
};
export type LangPackDifference = langPackDifference;

export type langPackLanguage = {
  _: 'langPackLanguage';
  flags?: number;
  official?: boolean;
  rtl?: boolean;
  beta?: boolean;
  name?: string;
  native_name?: string;
  lang_code?: string;
  base_lang_code?: string;
  plural_code?: string;
  strings_count?: number;
  translated_count?: number;
  translations_url?: string;
};
export type LangPackLanguage = langPackLanguage;

export type channelAdminLogEventActionChangeTitle = {
  _: 'channelAdminLogEventActionChangeTitle';
  prev_value?: string;
  new_value?: string;
};
export type channelAdminLogEventActionChangeAbout = {
  _: 'channelAdminLogEventActionChangeAbout';
  prev_value?: string;
  new_value?: string;
};
export type channelAdminLogEventActionChangeUsername = {
  _: 'channelAdminLogEventActionChangeUsername';
  prev_value?: string;
  new_value?: string;
};
export type channelAdminLogEventActionChangePhoto = {
  _: 'channelAdminLogEventActionChangePhoto';
  prev_photo: Photo;
  new_photo: Photo;
};
export type channelAdminLogEventActionToggleInvites = {
  _: 'channelAdminLogEventActionToggleInvites';
  new_value?: boolean;
};
export type channelAdminLogEventActionToggleSignatures = {
  _: 'channelAdminLogEventActionToggleSignatures';
  new_value?: boolean;
};
export type channelAdminLogEventActionUpdatePinned = {
  _: 'channelAdminLogEventActionUpdatePinned';
  message: Message;
};
export type channelAdminLogEventActionEditMessage = {
  _: 'channelAdminLogEventActionEditMessage';
  prev_message: Message;
  new_message: Message;
};
export type channelAdminLogEventActionDeleteMessage = {
  _: 'channelAdminLogEventActionDeleteMessage';
  message: Message;
};
export type channelAdminLogEventActionParticipantJoin = {
  _: 'channelAdminLogEventActionParticipantJoin';
};
export type channelAdminLogEventActionParticipantLeave = {
  _: 'channelAdminLogEventActionParticipantLeave';
};
export type channelAdminLogEventActionParticipantInvite = {
  _: 'channelAdminLogEventActionParticipantInvite';
  participant: ChannelParticipant;
};
export type channelAdminLogEventActionParticipantToggleBan = {
  _: 'channelAdminLogEventActionParticipantToggleBan';
  prev_participant: ChannelParticipant;
  new_participant: ChannelParticipant;
};
export type channelAdminLogEventActionParticipantToggleAdmin = {
  _: 'channelAdminLogEventActionParticipantToggleAdmin';
  prev_participant: ChannelParticipant;
  new_participant: ChannelParticipant;
};
export type channelAdminLogEventActionChangeStickerSet = {
  _: 'channelAdminLogEventActionChangeStickerSet';
  prev_stickerset: InputStickerSet;
  new_stickerset: InputStickerSet;
};
export type channelAdminLogEventActionTogglePreHistoryHidden = {
  _: 'channelAdminLogEventActionTogglePreHistoryHidden';
  new_value?: boolean;
};
export type channelAdminLogEventActionDefaultBannedRights = {
  _: 'channelAdminLogEventActionDefaultBannedRights';
  prev_banned_rights: ChatBannedRights;
  new_banned_rights: ChatBannedRights;
};
export type channelAdminLogEventActionStopPoll = {
  _: 'channelAdminLogEventActionStopPoll';
  message: Message;
};
export type channelAdminLogEventActionChangeLinkedChat = {
  _: 'channelAdminLogEventActionChangeLinkedChat';
  prev_value?: number;
  new_value?: number;
};
export type channelAdminLogEventActionChangeLocation = {
  _: 'channelAdminLogEventActionChangeLocation';
  prev_value: ChannelLocation;
  new_value: ChannelLocation;
};
export type channelAdminLogEventActionToggleSlowMode = {
  _: 'channelAdminLogEventActionToggleSlowMode';
  prev_value?: number;
  new_value?: number;
};
export type channelAdminLogEventActionStartGroupCall = {
  _: 'channelAdminLogEventActionStartGroupCall';
  call: InputGroupCall;
};
export type channelAdminLogEventActionDiscardGroupCall = {
  _: 'channelAdminLogEventActionDiscardGroupCall';
  call: InputGroupCall;
};
export type channelAdminLogEventActionParticipantMute = {
  _: 'channelAdminLogEventActionParticipantMute';
  participant: GroupCallParticipant;
};
export type channelAdminLogEventActionParticipantUnmute = {
  _: 'channelAdminLogEventActionParticipantUnmute';
  participant: GroupCallParticipant;
};
export type channelAdminLogEventActionToggleGroupCallSetting = {
  _: 'channelAdminLogEventActionToggleGroupCallSetting';
  join_muted?: boolean;
};
export type channelAdminLogEventActionParticipantJoinByInvite = {
  _: 'channelAdminLogEventActionParticipantJoinByInvite';
  flags?: number;
  via_chatlist?: boolean;
  invite: ExportedChatInvite;
};
export type channelAdminLogEventActionExportedInviteDelete = {
  _: 'channelAdminLogEventActionExportedInviteDelete';
  invite: ExportedChatInvite;
};
export type channelAdminLogEventActionExportedInviteRevoke = {
  _: 'channelAdminLogEventActionExportedInviteRevoke';
  invite: ExportedChatInvite;
};
export type channelAdminLogEventActionExportedInviteEdit = {
  _: 'channelAdminLogEventActionExportedInviteEdit';
  prev_invite: ExportedChatInvite;
  new_invite: ExportedChatInvite;
};
export type channelAdminLogEventActionParticipantVolume = {
  _: 'channelAdminLogEventActionParticipantVolume';
  participant: GroupCallParticipant;
};
export type channelAdminLogEventActionChangeHistoryTTL = {
  _: 'channelAdminLogEventActionChangeHistoryTTL';
  prev_value?: number;
  new_value?: number;
};
export type channelAdminLogEventActionParticipantJoinByRequest = {
  _: 'channelAdminLogEventActionParticipantJoinByRequest';
  invite: ExportedChatInvite;
  approved_by?: number;
};
export type channelAdminLogEventActionToggleNoForwards = {
  _: 'channelAdminLogEventActionToggleNoForwards';
  new_value?: boolean;
};
export type channelAdminLogEventActionSendMessage = {
  _: 'channelAdminLogEventActionSendMessage';
  message: Message;
};
export type channelAdminLogEventActionChangeAvailableReactions = {
  _: 'channelAdminLogEventActionChangeAvailableReactions';
  prev_value: ChatReactions;
  new_value: ChatReactions;
};
export type channelAdminLogEventActionChangeUsernames = {
  _: 'channelAdminLogEventActionChangeUsernames';
  prev_value?: Array<string>;
  new_value?: Array<string>;
};
export type channelAdminLogEventActionToggleForum = {
  _: 'channelAdminLogEventActionToggleForum';
  new_value?: boolean;
};
export type channelAdminLogEventActionCreateTopic = {
  _: 'channelAdminLogEventActionCreateTopic';
  topic: ForumTopic;
};
export type channelAdminLogEventActionEditTopic = {
  _: 'channelAdminLogEventActionEditTopic';
  prev_topic: ForumTopic;
  new_topic: ForumTopic;
};
export type channelAdminLogEventActionDeleteTopic = {
  _: 'channelAdminLogEventActionDeleteTopic';
  topic: ForumTopic;
};
export type channelAdminLogEventActionPinTopic = {
  _: 'channelAdminLogEventActionPinTopic';
  flags?: number;
  prev_topic?: ForumTopic;
  new_topic?: ForumTopic;
};
export type channelAdminLogEventActionToggleAntiSpam = {
  _: 'channelAdminLogEventActionToggleAntiSpam';
  new_value?: boolean;
};
export type ChannelAdminLogEventAction = channelAdminLogEventActionChangeTitle | channelAdminLogEventActionChangeAbout | channelAdminLogEventActionChangeUsername | channelAdminLogEventActionChangePhoto | channelAdminLogEventActionToggleInvites | channelAdminLogEventActionToggleSignatures | channelAdminLogEventActionUpdatePinned | channelAdminLogEventActionEditMessage | channelAdminLogEventActionDeleteMessage | channelAdminLogEventActionParticipantJoin | channelAdminLogEventActionParticipantLeave | channelAdminLogEventActionParticipantInvite | channelAdminLogEventActionParticipantToggleBan | channelAdminLogEventActionParticipantToggleAdmin | channelAdminLogEventActionChangeStickerSet | channelAdminLogEventActionTogglePreHistoryHidden | channelAdminLogEventActionDefaultBannedRights | channelAdminLogEventActionStopPoll | channelAdminLogEventActionChangeLinkedChat | channelAdminLogEventActionChangeLocation | channelAdminLogEventActionToggleSlowMode | channelAdminLogEventActionStartGroupCall | channelAdminLogEventActionDiscardGroupCall | channelAdminLogEventActionParticipantMute | channelAdminLogEventActionParticipantUnmute | channelAdminLogEventActionToggleGroupCallSetting | channelAdminLogEventActionParticipantJoinByInvite | channelAdminLogEventActionExportedInviteDelete | channelAdminLogEventActionExportedInviteRevoke | channelAdminLogEventActionExportedInviteEdit | channelAdminLogEventActionParticipantVolume | channelAdminLogEventActionChangeHistoryTTL | channelAdminLogEventActionParticipantJoinByRequest | channelAdminLogEventActionToggleNoForwards | channelAdminLogEventActionSendMessage | channelAdminLogEventActionChangeAvailableReactions | channelAdminLogEventActionChangeUsernames | channelAdminLogEventActionToggleForum | channelAdminLogEventActionCreateTopic | channelAdminLogEventActionEditTopic | channelAdminLogEventActionDeleteTopic | channelAdminLogEventActionPinTopic | channelAdminLogEventActionToggleAntiSpam;

export type channelAdminLogEvent = {
  _: 'channelAdminLogEvent';
  id?: number;
  date?: number;
  user_id?: number;
  action: ChannelAdminLogEventAction;
};
export type ChannelAdminLogEvent = channelAdminLogEvent;

export type channels_adminLogResults = {
  _: 'channels.adminLogResults';
  events: Array<ChannelAdminLogEvent>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type channels_AdminLogResults = channels_adminLogResults;

export type channelAdminLogEventsFilter = {
  _: 'channelAdminLogEventsFilter';
  flags?: number;
  join?: boolean;
  leave?: boolean;
  invite?: boolean;
  ban?: boolean;
  unban?: boolean;
  kick?: boolean;
  unkick?: boolean;
  promote?: boolean;
  demote?: boolean;
  info?: boolean;
  settings?: boolean;
  pinned?: boolean;
  edit?: boolean;
  delete?: boolean;
  group_call?: boolean;
  invites?: boolean;
  send?: boolean;
  forums?: boolean;
};
export type ChannelAdminLogEventsFilter = channelAdminLogEventsFilter;

export type popularContact = {
  _: 'popularContact';
  client_id?: number;
  importers?: number;
};
export type PopularContact = popularContact;

export type messages_favedStickersNotModified = {
  _: 'messages.favedStickersNotModified';
};
export type messages_favedStickers = {
  _: 'messages.favedStickers';
  hash?: number;
  packs: Array<StickerPack>;
  stickers: Array<Document>;
};
export type messages_FavedStickers = messages_favedStickersNotModified | messages_favedStickers;

export type recentMeUrlUnknown = {
  _: 'recentMeUrlUnknown';
  url?: string;
};
export type recentMeUrlUser = {
  _: 'recentMeUrlUser';
  url?: string;
  user_id?: number;
};
export type recentMeUrlChat = {
  _: 'recentMeUrlChat';
  url?: string;
  chat_id?: number;
};
export type recentMeUrlChatInvite = {
  _: 'recentMeUrlChatInvite';
  url?: string;
  chat_invite: ChatInvite;
};
export type recentMeUrlStickerSet = {
  _: 'recentMeUrlStickerSet';
  url?: string;
  set: StickerSetCovered;
};
export type RecentMeUrl = recentMeUrlUnknown | recentMeUrlUser | recentMeUrlChat | recentMeUrlChatInvite | recentMeUrlStickerSet;

export type help_recentMeUrls = {
  _: 'help.recentMeUrls';
  urls: Array<RecentMeUrl>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type help_RecentMeUrls = help_recentMeUrls;

export type inputSingleMedia = {
  _: 'inputSingleMedia';
  flags?: number;
  media: InputMedia;
  random_id?: number;
  message?: string;
  entities?: Array<MessageEntity>;
};
export type InputSingleMedia = inputSingleMedia;

export type webAuthorization = {
  _: 'webAuthorization';
  hash?: number;
  bot_id?: number;
  domain?: string;
  browser?: string;
  platform?: string;
  date_created?: number;
  date_active?: number;
  ip?: string;
  region?: string;
};
export type WebAuthorization = webAuthorization;

export type account_webAuthorizations = {
  _: 'account.webAuthorizations';
  authorizations: Array<WebAuthorization>;
  users: Array<User>;
};
export type account_WebAuthorizations = account_webAuthorizations;

export type inputMessageID = {
  _: 'inputMessageID';
  id?: number;
};
export type inputMessageReplyTo = {
  _: 'inputMessageReplyTo';
  id?: number;
};
export type inputMessagePinned = {
  _: 'inputMessagePinned';
};
export type inputMessageCallbackQuery = {
  _: 'inputMessageCallbackQuery';
  id?: number;
  query_id?: number;
};
export type InputMessage = inputMessageID | inputMessageReplyTo | inputMessagePinned | inputMessageCallbackQuery;

export type inputDialogPeer = {
  _: 'inputDialogPeer';
  peer: InputPeer;
};
export type inputDialogPeerFolder = {
  _: 'inputDialogPeerFolder';
  folder_id?: number;
};
export type InputDialogPeer = inputDialogPeer | inputDialogPeerFolder;

export type dialogPeer = {
  _: 'dialogPeer';
  peer: Peer;
};
export type dialogPeerFolder = {
  _: 'dialogPeerFolder';
  folder_id?: number;
};
export type DialogPeer = dialogPeer | dialogPeerFolder;

export type messages_foundStickerSetsNotModified = {
  _: 'messages.foundStickerSetsNotModified';
};
export type messages_foundStickerSets = {
  _: 'messages.foundStickerSets';
  hash?: number;
  sets: Array<StickerSetCovered>;
};
export type messages_FoundStickerSets = messages_foundStickerSetsNotModified | messages_foundStickerSets;

export type fileHash = {
  _: 'fileHash';
  offset?: number;
  limit?: number;
  hash?: Uint8Array;
};
export type FileHash = fileHash;

export type inputClientProxy = {
  _: 'inputClientProxy';
  address?: string;
  port?: number;
};
export type InputClientProxy = inputClientProxy;

export type help_termsOfServiceUpdateEmpty = {
  _: 'help.termsOfServiceUpdateEmpty';
  expires?: number;
};
export type help_termsOfServiceUpdate = {
  _: 'help.termsOfServiceUpdate';
  expires?: number;
  terms_of_service: help_TermsOfService;
};
export type help_TermsOfServiceUpdate = help_termsOfServiceUpdateEmpty | help_termsOfServiceUpdate;

export type inputSecureFileUploaded = {
  _: 'inputSecureFileUploaded';
  id?: number;
  parts?: number;
  md5_checksum?: string;
  file_hash?: Uint8Array;
  secret?: Uint8Array;
};
export type inputSecureFile = {
  _: 'inputSecureFile';
  id?: number;
  access_hash?: number;
};
export type InputSecureFile = inputSecureFileUploaded | inputSecureFile;

export type secureFileEmpty = {
  _: 'secureFileEmpty';
};
export type secureFile = {
  _: 'secureFile';
  id?: number;
  access_hash?: number;
  size?: number;
  dc_id?: number;
  date?: number;
  file_hash?: Uint8Array;
  secret?: Uint8Array;
};
export type SecureFile = secureFileEmpty | secureFile;

export type secureData = {
  _: 'secureData';
  data?: Uint8Array;
  data_hash?: Uint8Array;
  secret?: Uint8Array;
};
export type SecureData = secureData;

export type securePlainPhone = {
  _: 'securePlainPhone';
  phone?: string;
};
export type securePlainEmail = {
  _: 'securePlainEmail';
  email?: string;
};
export type SecurePlainData = securePlainPhone | securePlainEmail;

export type secureValueTypePersonalDetails = {
  _: 'secureValueTypePersonalDetails';
};
export type secureValueTypePassport = {
  _: 'secureValueTypePassport';
};
export type secureValueTypeDriverLicense = {
  _: 'secureValueTypeDriverLicense';
};
export type secureValueTypeIdentityCard = {
  _: 'secureValueTypeIdentityCard';
};
export type secureValueTypeInternalPassport = {
  _: 'secureValueTypeInternalPassport';
};
export type secureValueTypeAddress = {
  _: 'secureValueTypeAddress';
};
export type secureValueTypeUtilityBill = {
  _: 'secureValueTypeUtilityBill';
};
export type secureValueTypeBankStatement = {
  _: 'secureValueTypeBankStatement';
};
export type secureValueTypeRentalAgreement = {
  _: 'secureValueTypeRentalAgreement';
};
export type secureValueTypePassportRegistration = {
  _: 'secureValueTypePassportRegistration';
};
export type secureValueTypeTemporaryRegistration = {
  _: 'secureValueTypeTemporaryRegistration';
};
export type secureValueTypePhone = {
  _: 'secureValueTypePhone';
};
export type secureValueTypeEmail = {
  _: 'secureValueTypeEmail';
};
export type SecureValueType = secureValueTypePersonalDetails | secureValueTypePassport | secureValueTypeDriverLicense | secureValueTypeIdentityCard | secureValueTypeInternalPassport | secureValueTypeAddress | secureValueTypeUtilityBill | secureValueTypeBankStatement | secureValueTypeRentalAgreement | secureValueTypePassportRegistration | secureValueTypeTemporaryRegistration | secureValueTypePhone | secureValueTypeEmail;

export type secureValue = {
  _: 'secureValue';
  flags?: number;
  type: SecureValueType;
  data?: SecureData;
  front_side?: SecureFile;
  reverse_side?: SecureFile;
  selfie?: SecureFile;
  translation?: Array<SecureFile>;
  files?: Array<SecureFile>;
  plain_data?: SecurePlainData;
  hash?: Uint8Array;
};
export type SecureValue = secureValue;

export type inputSecureValue = {
  _: 'inputSecureValue';
  flags?: number;
  type: SecureValueType;
  data?: SecureData;
  front_side?: InputSecureFile;
  reverse_side?: InputSecureFile;
  selfie?: InputSecureFile;
  translation?: Array<InputSecureFile>;
  files?: Array<InputSecureFile>;
  plain_data?: SecurePlainData;
};
export type InputSecureValue = inputSecureValue;

export type secureValueHash = {
  _: 'secureValueHash';
  type: SecureValueType;
  hash?: Uint8Array;
};
export type SecureValueHash = secureValueHash;

export type secureValueErrorData = {
  _: 'secureValueErrorData';
  type: SecureValueType;
  data_hash?: Uint8Array;
  field?: string;
  text?: string;
};
export type secureValueErrorFrontSide = {
  _: 'secureValueErrorFrontSide';
  type: SecureValueType;
  file_hash?: Uint8Array;
  text?: string;
};
export type secureValueErrorReverseSide = {
  _: 'secureValueErrorReverseSide';
  type: SecureValueType;
  file_hash?: Uint8Array;
  text?: string;
};
export type secureValueErrorSelfie = {
  _: 'secureValueErrorSelfie';
  type: SecureValueType;
  file_hash?: Uint8Array;
  text?: string;
};
export type secureValueErrorFile = {
  _: 'secureValueErrorFile';
  type: SecureValueType;
  file_hash?: Uint8Array;
  text?: string;
};
export type secureValueErrorFiles = {
  _: 'secureValueErrorFiles';
  type: SecureValueType;
  file_hash?: Array<Uint8Array>;
  text?: string;
};
export type secureValueError = {
  _: 'secureValueError';
  type: SecureValueType;
  hash?: Uint8Array;
  text?: string;
};
export type secureValueErrorTranslationFile = {
  _: 'secureValueErrorTranslationFile';
  type: SecureValueType;
  file_hash?: Uint8Array;
  text?: string;
};
export type secureValueErrorTranslationFiles = {
  _: 'secureValueErrorTranslationFiles';
  type: SecureValueType;
  file_hash?: Array<Uint8Array>;
  text?: string;
};
export type SecureValueError = secureValueErrorData | secureValueErrorFrontSide | secureValueErrorReverseSide | secureValueErrorSelfie | secureValueErrorFile | secureValueErrorFiles | secureValueError | secureValueErrorTranslationFile | secureValueErrorTranslationFiles;

export type secureCredentialsEncrypted = {
  _: 'secureCredentialsEncrypted';
  data?: Uint8Array;
  hash?: Uint8Array;
  secret?: Uint8Array;
};
export type SecureCredentialsEncrypted = secureCredentialsEncrypted;

export type account_authorizationForm = {
  _: 'account.authorizationForm';
  flags?: number;
  required_types: Array<SecureRequiredType>;
  values: Array<SecureValue>;
  errors: Array<SecureValueError>;
  users: Array<User>;
  privacy_policy_url?: string;
};
export type account_AuthorizationForm = account_authorizationForm;

export type account_sentEmailCode = {
  _: 'account.sentEmailCode';
  email_pattern?: string;
  length?: number;
};
export type account_SentEmailCode = account_sentEmailCode;

export type help_deepLinkInfoEmpty = {
  _: 'help.deepLinkInfoEmpty';
};
export type help_deepLinkInfo = {
  _: 'help.deepLinkInfo';
  flags?: number;
  update_app?: boolean;
  message?: string;
  entities?: Array<MessageEntity>;
};
export type help_DeepLinkInfo = help_deepLinkInfoEmpty | help_deepLinkInfo;

export type savedPhoneContact = {
  _: 'savedPhoneContact';
  phone?: string;
  first_name?: string;
  last_name?: string;
  date?: number;
};
export type SavedContact = savedPhoneContact;

export type account_takeout = {
  _: 'account.takeout';
  id?: number;
};
export type account_Takeout = account_takeout;

export type passwordKdfAlgoUnknown = {
  _: 'passwordKdfAlgoUnknown';
};
export type passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow = {
  _: 'passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow';
  salt1?: Uint8Array;
  salt2?: Uint8Array;
  g?: number;
  p?: Uint8Array;
};
export type PasswordKdfAlgo = passwordKdfAlgoUnknown | passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow;

export type securePasswordKdfAlgoUnknown = {
  _: 'securePasswordKdfAlgoUnknown';
};
export type securePasswordKdfAlgoPBKDF2HMACSHA512iter100000 = {
  _: 'securePasswordKdfAlgoPBKDF2HMACSHA512iter100000';
  salt?: Uint8Array;
};
export type securePasswordKdfAlgoSHA512 = {
  _: 'securePasswordKdfAlgoSHA512';
  salt?: Uint8Array;
};
export type SecurePasswordKdfAlgo = securePasswordKdfAlgoUnknown | securePasswordKdfAlgoPBKDF2HMACSHA512iter100000 | securePasswordKdfAlgoSHA512;

export type secureSecretSettings = {
  _: 'secureSecretSettings';
  secure_algo: SecurePasswordKdfAlgo;
  secure_secret?: Uint8Array;
  secure_secret_id?: number;
};
export type SecureSecretSettings = secureSecretSettings;

export type inputCheckPasswordEmpty = {
  _: 'inputCheckPasswordEmpty';
};
export type inputCheckPasswordSRP = {
  _: 'inputCheckPasswordSRP';
  srp_id?: number;
  A?: Uint8Array;
  M1?: Uint8Array;
};
export type InputCheckPasswordSRP = inputCheckPasswordEmpty | inputCheckPasswordSRP;

export type secureRequiredType = {
  _: 'secureRequiredType';
  flags?: number;
  native_names?: boolean;
  selfie_required?: boolean;
  translation_required?: boolean;
  type: SecureValueType;
};
export type secureRequiredTypeOneOf = {
  _: 'secureRequiredTypeOneOf';
  types: Array<SecureRequiredType>;
};
export type SecureRequiredType = secureRequiredType | secureRequiredTypeOneOf;

export type help_passportConfigNotModified = {
  _: 'help.passportConfigNotModified';
};
export type help_passportConfig = {
  _: 'help.passportConfig';
  hash?: number;
  countries_langs: DataJSON;
};
export type help_PassportConfig = help_passportConfigNotModified | help_passportConfig;

export type inputAppEvent = {
  _: 'inputAppEvent';
  time?: number;
  type?: string;
  peer?: number;
  data: JSONValue;
};
export type InputAppEvent = inputAppEvent;

export type jsonObjectValue = {
  _: 'jsonObjectValue';
  key?: string;
  value: JSONValue;
};
export type JSONObjectValue = jsonObjectValue;

export type jsonNull = {
  _: 'jsonNull';
};
export type jsonBool = {
  _: 'jsonBool';
  value?: boolean;
};
export type jsonNumber = {
  _: 'jsonNumber';
  value?: number;
};
export type jsonString = {
  _: 'jsonString';
  value?: string;
};
export type jsonArray = {
  _: 'jsonArray';
  value: Array<JSONValue>;
};
export type jsonObject = {
  _: 'jsonObject';
  value: Array<JSONObjectValue>;
};
export type JSONValue = jsonNull | jsonBool | jsonNumber | jsonString | jsonArray | jsonObject;

export type pageTableCell = {
  _: 'pageTableCell';
  flags?: number;
  header?: boolean;
  align_center?: boolean;
  align_right?: boolean;
  valign_middle?: boolean;
  valign_bottom?: boolean;
  text?: RichText;
  colspan?: number;
  rowspan?: number;
};
export type PageTableCell = pageTableCell;

export type pageTableRow = {
  _: 'pageTableRow';
  cells: Array<PageTableCell>;
};
export type PageTableRow = pageTableRow;

export type pageCaption = {
  _: 'pageCaption';
  text: RichText;
  credit: RichText;
};
export type PageCaption = pageCaption;

export type pageListItemText = {
  _: 'pageListItemText';
  text: RichText;
};
export type pageListItemBlocks = {
  _: 'pageListItemBlocks';
  blocks: Array<PageBlock>;
};
export type PageListItem = pageListItemText | pageListItemBlocks;

export type pageListOrderedItemText = {
  _: 'pageListOrderedItemText';
  num?: string;
  text: RichText;
};
export type pageListOrderedItemBlocks = {
  _: 'pageListOrderedItemBlocks';
  num?: string;
  blocks: Array<PageBlock>;
};
export type PageListOrderedItem = pageListOrderedItemText | pageListOrderedItemBlocks;

export type pageRelatedArticle = {
  _: 'pageRelatedArticle';
  flags?: number;
  url?: string;
  webpage_id?: number;
  title?: string;
  description?: string;
  photo_id?: number;
  author?: string;
  published_date?: number;
};
export type PageRelatedArticle = pageRelatedArticle;

export type page = {
  _: 'page';
  flags?: number;
  part?: boolean;
  rtl?: boolean;
  v2?: boolean;
  url?: string;
  blocks: Array<PageBlock>;
  photos: Array<Photo>;
  documents: Array<Document>;
  views?: number;
};
export type Page = page;

export type help_supportName = {
  _: 'help.supportName';
  name?: string;
};
export type help_SupportName = help_supportName;

export type help_userInfoEmpty = {
  _: 'help.userInfoEmpty';
};
export type help_userInfo = {
  _: 'help.userInfo';
  message?: string;
  entities: Array<MessageEntity>;
  author?: string;
  date?: number;
};
export type help_UserInfo = help_userInfoEmpty | help_userInfo;

export type pollAnswer = {
  _: 'pollAnswer';
  text?: string;
  option?: Uint8Array;
};
export type PollAnswer = pollAnswer;

export type poll = {
  _: 'poll';
  id?: number;
  flags?: number;
  closed?: boolean;
  public_voters?: boolean;
  multiple_choice?: boolean;
  quiz?: boolean;
  question?: string;
  answers: Array<PollAnswer>;
  close_period?: number;
  close_date?: number;
};
export type Poll = poll;

export type pollAnswerVoters = {
  _: 'pollAnswerVoters';
  flags?: number;
  chosen?: boolean;
  correct?: boolean;
  option?: Uint8Array;
  voters?: number;
};
export type PollAnswerVoters = pollAnswerVoters;

export type pollResults = {
  _: 'pollResults';
  flags?: number;
  min?: boolean;
  results?: Array<PollAnswerVoters>;
  total_voters?: number;
  recent_voters?: Array<number>;
  solution?: string;
  solution_entities?: Array<MessageEntity>;
};
export type PollResults = pollResults;

export type chatOnlines = {
  _: 'chatOnlines';
  onlines?: number;
};
export type ChatOnlines = chatOnlines;

export type statsURL = {
  _: 'statsURL';
  url?: string;
};
export type StatsURL = statsURL;

export type chatAdminRights = {
  _: 'chatAdminRights';
  flags?: number;
  change_info?: boolean;
  post_messages?: boolean;
  edit_messages?: boolean;
  delete_messages?: boolean;
  ban_users?: boolean;
  invite_users?: boolean;
  pin_messages?: boolean;
  add_admins?: boolean;
  anonymous?: boolean;
  manage_call?: boolean;
  other?: boolean;
  manage_topics?: boolean;
};
export type ChatAdminRights = chatAdminRights;

export type chatBannedRights = {
  _: 'chatBannedRights';
  flags?: number;
  view_messages?: boolean;
  send_messages?: boolean;
  send_media?: boolean;
  send_stickers?: boolean;
  send_gifs?: boolean;
  send_games?: boolean;
  send_inline?: boolean;
  embed_links?: boolean;
  send_polls?: boolean;
  change_info?: boolean;
  invite_users?: boolean;
  pin_messages?: boolean;
  manage_topics?: boolean;
  send_photos?: boolean;
  send_videos?: boolean;
  send_roundvideos?: boolean;
  send_audios?: boolean;
  send_voices?: boolean;
  send_docs?: boolean;
  send_plain?: boolean;
  until_date?: number;
};
export type ChatBannedRights = chatBannedRights;

export type inputWallPaper = {
  _: 'inputWallPaper';
  id?: number;
  access_hash?: number;
};
export type inputWallPaperSlug = {
  _: 'inputWallPaperSlug';
  slug?: string;
};
export type inputWallPaperNoFile = {
  _: 'inputWallPaperNoFile';
  id?: number;
};
export type InputWallPaper = inputWallPaper | inputWallPaperSlug | inputWallPaperNoFile;

export type account_wallPapersNotModified = {
  _: 'account.wallPapersNotModified';
};
export type account_wallPapers = {
  _: 'account.wallPapers';
  hash?: number;
  wallpapers: Array<WallPaper>;
};
export type account_WallPapers = account_wallPapersNotModified | account_wallPapers;

export type codeSettings = {
  _: 'codeSettings';
  flags?: number;
  allow_flashcall?: boolean;
  current_number?: boolean;
  allow_app_hash?: boolean;
  allow_missed_call?: boolean;
  allow_firebase?: boolean;
  logout_tokens?: Array<Uint8Array>;
  token?: string;
  app_sandbox?: boolean;
};
export type CodeSettings = codeSettings;

export type wallPaperSettings = {
  _: 'wallPaperSettings';
  flags?: number;
  blur?: boolean;
  motion?: boolean;
  background_color?: number;
  second_background_color?: number;
  third_background_color?: number;
  fourth_background_color?: number;
  intensity?: number;
  rotation?: number;
};
export type WallPaperSettings = wallPaperSettings;

export type autoDownloadSettings = {
  _: 'autoDownloadSettings';
  flags?: number;
  disabled?: boolean;
  video_preload_large?: boolean;
  audio_preload_next?: boolean;
  phonecalls_less_data?: boolean;
  photo_size_max?: number;
  video_size_max?: number;
  file_size_max?: number;
  video_upload_maxbitrate?: number;
};
export type AutoDownloadSettings = autoDownloadSettings;

export type account_autoDownloadSettings = {
  _: 'account.autoDownloadSettings';
  low: AutoDownloadSettings;
  medium: AutoDownloadSettings;
  high: AutoDownloadSettings;
};
export type account_AutoDownloadSettings = account_autoDownloadSettings;

export type emojiKeyword = {
  _: 'emojiKeyword';
  keyword?: string;
  emoticons?: Array<string>;
};
export type emojiKeywordDeleted = {
  _: 'emojiKeywordDeleted';
  keyword?: string;
  emoticons?: Array<string>;
};
export type EmojiKeyword = emojiKeyword | emojiKeywordDeleted;

export type emojiKeywordsDifference = {
  _: 'emojiKeywordsDifference';
  lang_code?: string;
  from_version?: number;
  version?: number;
  keywords: Array<EmojiKeyword>;
};
export type EmojiKeywordsDifference = emojiKeywordsDifference;

export type emojiURL = {
  _: 'emojiURL';
  url?: string;
};
export type EmojiURL = emojiURL;

export type emojiLanguage = {
  _: 'emojiLanguage';
  lang_code?: string;
};
export type EmojiLanguage = emojiLanguage;

export type folder = {
  _: 'folder';
  flags?: number;
  autofill_new_broadcasts?: boolean;
  autofill_public_groups?: boolean;
  autofill_new_correspondents?: boolean;
  id?: number;
  title?: string;
  photo?: ChatPhoto;
};
export type Folder = folder;

export type inputFolderPeer = {
  _: 'inputFolderPeer';
  peer: InputPeer;
  folder_id?: number;
};
export type InputFolderPeer = inputFolderPeer;

export type folderPeer = {
  _: 'folderPeer';
  peer: Peer;
  folder_id?: number;
};
export type FolderPeer = folderPeer;

export type messages_searchCounter = {
  _: 'messages.searchCounter';
  flags?: number;
  inexact?: boolean;
  filter: MessagesFilter;
  count?: number;
};
export type messages_SearchCounter = messages_searchCounter;

export type urlAuthResultRequest = {
  _: 'urlAuthResultRequest';
  flags?: number;
  request_write_access?: boolean;
  bot: User;
  domain?: string;
};
export type urlAuthResultAccepted = {
  _: 'urlAuthResultAccepted';
  url?: string;
};
export type urlAuthResultDefault = {
  _: 'urlAuthResultDefault';
};
export type UrlAuthResult = urlAuthResultRequest | urlAuthResultAccepted | urlAuthResultDefault;

export type channelLocationEmpty = {
  _: 'channelLocationEmpty';
};
export type channelLocation = {
  _: 'channelLocation';
  geo_point: GeoPoint;
  address?: string;
};
export type ChannelLocation = channelLocationEmpty | channelLocation;

export type peerLocated = {
  _: 'peerLocated';
  peer: Peer;
  expires?: number;
  distance?: number;
};
export type peerSelfLocated = {
  _: 'peerSelfLocated';
  expires?: number;
};
export type PeerLocated = peerLocated | peerSelfLocated;

export type restrictionReason = {
  _: 'restrictionReason';
  platform?: string;
  reason?: string;
  text?: string;
};
export type RestrictionReason = restrictionReason;

export type inputTheme = {
  _: 'inputTheme';
  id?: number;
  access_hash?: number;
};
export type inputThemeSlug = {
  _: 'inputThemeSlug';
  slug?: string;
};
export type InputTheme = inputTheme | inputThemeSlug;

export type theme = {
  _: 'theme';
  flags?: number;
  creator?: boolean;
  default?: boolean;
  for_chat?: boolean;
  id?: number;
  access_hash?: number;
  slug?: string;
  title?: string;
  document?: Document;
  settings?: Array<ThemeSettings>;
  emoticon?: string;
  installs_count?: number;
};
export type Theme = theme;

export type account_themesNotModified = {
  _: 'account.themesNotModified';
};
export type account_themes = {
  _: 'account.themes';
  hash?: number;
  themes: Array<Theme>;
};
export type account_Themes = account_themesNotModified | account_themes;

export type auth_loginToken = {
  _: 'auth.loginToken';
  expires?: number;
  token?: Uint8Array;
};
export type auth_loginTokenMigrateTo = {
  _: 'auth.loginTokenMigrateTo';
  dc_id?: number;
  token?: Uint8Array;
};
export type auth_loginTokenSuccess = {
  _: 'auth.loginTokenSuccess';
  authorization: auth_Authorization;
};
export type auth_LoginToken = auth_loginToken | auth_loginTokenMigrateTo | auth_loginTokenSuccess;

export type account_contentSettings = {
  _: 'account.contentSettings';
  flags?: number;
  sensitive_enabled?: boolean;
  sensitive_can_change?: boolean;
};
export type account_ContentSettings = account_contentSettings;

export type messages_inactiveChats = {
  _: 'messages.inactiveChats';
  dates?: Array<number>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_InactiveChats = messages_inactiveChats;

export type baseThemeClassic = {
  _: 'baseThemeClassic';
};
export type baseThemeDay = {
  _: 'baseThemeDay';
};
export type baseThemeNight = {
  _: 'baseThemeNight';
};
export type baseThemeTinted = {
  _: 'baseThemeTinted';
};
export type baseThemeArctic = {
  _: 'baseThemeArctic';
};
export type BaseTheme = baseThemeClassic | baseThemeDay | baseThemeNight | baseThemeTinted | baseThemeArctic;

export type inputThemeSettings = {
  _: 'inputThemeSettings';
  flags?: number;
  message_colors_animated?: boolean;
  base_theme: BaseTheme;
  accent_color?: number;
  outbox_accent_color?: number;
  message_colors?: Array<number>;
  wallpaper?: InputWallPaper;
  wallpaper_settings?: WallPaperSettings;
};
export type InputThemeSettings = inputThemeSettings;

export type themeSettings = {
  _: 'themeSettings';
  flags?: number;
  message_colors_animated?: boolean;
  base_theme: BaseTheme;
  accent_color?: number;
  outbox_accent_color?: number;
  message_colors?: Array<number>;
  wallpaper?: WallPaper;
};
export type ThemeSettings = themeSettings;

export type webPageAttributeTheme = {
  _: 'webPageAttributeTheme';
  flags?: number;
  documents?: Array<Document>;
  settings?: ThemeSettings;
};
export type WebPageAttribute = webPageAttributeTheme;

export type messageUserVote = {
  _: 'messageUserVote';
  user_id?: number;
  option?: Uint8Array;
  date?: number;
};
export type messageUserVoteInputOption = {
  _: 'messageUserVoteInputOption';
  user_id?: number;
  date?: number;
};
export type messageUserVoteMultiple = {
  _: 'messageUserVoteMultiple';
  user_id?: number;
  options?: Array<Uint8Array>;
  date?: number;
};
export type MessageUserVote = messageUserVote | messageUserVoteInputOption | messageUserVoteMultiple;

export type messages_votesList = {
  _: 'messages.votesList';
  flags?: number;
  count?: number;
  votes: Array<MessageUserVote>;
  users: Array<User>;
  next_offset?: string;
};
export type messages_VotesList = messages_votesList;

export type bankCardOpenUrl = {
  _: 'bankCardOpenUrl';
  url?: string;
  name?: string;
};
export type BankCardOpenUrl = bankCardOpenUrl;

export type payments_bankCardData = {
  _: 'payments.bankCardData';
  title?: string;
  open_urls: Array<BankCardOpenUrl>;
};
export type payments_BankCardData = payments_bankCardData;

export type dialogFilter = {
  _: 'dialogFilter';
  flags?: number;
  contacts?: boolean;
  non_contacts?: boolean;
  groups?: boolean;
  broadcasts?: boolean;
  bots?: boolean;
  exclude_muted?: boolean;
  exclude_read?: boolean;
  exclude_archived?: boolean;
  id?: number;
  title?: string;
  emoticon?: string;
  pinned_peers: Array<InputPeer>;
  include_peers: Array<InputPeer>;
  exclude_peers: Array<InputPeer>;
};
export type dialogFilterDefault = {
  _: 'dialogFilterDefault';
};
export type dialogFilterChatlist = {
  _: 'dialogFilterChatlist';
  flags?: number;
  has_my_invites?: boolean;
  id?: number;
  title?: string;
  emoticon?: string;
  pinned_peers: Array<InputPeer>;
  include_peers: Array<InputPeer>;
};
export type DialogFilter = dialogFilter | dialogFilterDefault | dialogFilterChatlist;

export type dialogFilterSuggested = {
  _: 'dialogFilterSuggested';
  filter: DialogFilter;
  description?: string;
};
export type DialogFilterSuggested = dialogFilterSuggested;

export type statsDateRangeDays = {
  _: 'statsDateRangeDays';
  min_date?: number;
  max_date?: number;
};
export type StatsDateRangeDays = statsDateRangeDays;

export type statsAbsValueAndPrev = {
  _: 'statsAbsValueAndPrev';
  current?: number;
  previous?: number;
};
export type StatsAbsValueAndPrev = statsAbsValueAndPrev;

export type statsPercentValue = {
  _: 'statsPercentValue';
  part?: number;
  total?: number;
};
export type StatsPercentValue = statsPercentValue;

export type statsGraphAsync = {
  _: 'statsGraphAsync';
  token?: string;
};
export type statsGraphError = {
  _: 'statsGraphError';
  error?: string;
};
export type statsGraph = {
  _: 'statsGraph';
  flags?: number;
  json: DataJSON;
  zoom_token?: string;
};
export type StatsGraph = statsGraphAsync | statsGraphError | statsGraph;

export type messageInteractionCounters = {
  _: 'messageInteractionCounters';
  msg_id?: number;
  views?: number;
  forwards?: number;
};
export type MessageInteractionCounters = messageInteractionCounters;

export type stats_broadcastStats = {
  _: 'stats.broadcastStats';
  period: StatsDateRangeDays;
  followers: StatsAbsValueAndPrev;
  views_per_post: StatsAbsValueAndPrev;
  shares_per_post: StatsAbsValueAndPrev;
  enabled_notifications: StatsPercentValue;
  growth_graph: StatsGraph;
  followers_graph: StatsGraph;
  mute_graph: StatsGraph;
  top_hours_graph: StatsGraph;
  interactions_graph: StatsGraph;
  iv_interactions_graph: StatsGraph;
  views_by_source_graph: StatsGraph;
  new_followers_by_source_graph: StatsGraph;
  languages_graph: StatsGraph;
  recent_message_interactions: Array<MessageInteractionCounters>;
};
export type stats_BroadcastStats = stats_broadcastStats;

export type help_promoDataEmpty = {
  _: 'help.promoDataEmpty';
  expires?: number;
};
export type help_promoData = {
  _: 'help.promoData';
  flags?: number;
  proxy?: boolean;
  expires?: number;
  peer: Peer;
  chats: Array<Chat>;
  users: Array<User>;
  psa_type?: string;
  psa_message?: string;
};
export type help_PromoData = help_promoDataEmpty | help_promoData;

export type videoSize = {
  _: 'videoSize';
  flags?: number;
  type?: string;
  w?: number;
  h?: number;
  size?: number;
  video_start_ts?: number;
};
export type videoSizeEmojiMarkup = {
  _: 'videoSizeEmojiMarkup';
  emoji_id?: number;
  background_colors?: Array<number>;
};
export type videoSizeStickerMarkup = {
  _: 'videoSizeStickerMarkup';
  stickerset: InputStickerSet;
  sticker_id?: number;
  background_colors?: Array<number>;
};
export type VideoSize = videoSize | videoSizeEmojiMarkup | videoSizeStickerMarkup;

export type statsGroupTopPoster = {
  _: 'statsGroupTopPoster';
  user_id?: number;
  messages?: number;
  avg_chars?: number;
};
export type StatsGroupTopPoster = statsGroupTopPoster;

export type statsGroupTopAdmin = {
  _: 'statsGroupTopAdmin';
  user_id?: number;
  deleted?: number;
  kicked?: number;
  banned?: number;
};
export type StatsGroupTopAdmin = statsGroupTopAdmin;

export type statsGroupTopInviter = {
  _: 'statsGroupTopInviter';
  user_id?: number;
  invitations?: number;
};
export type StatsGroupTopInviter = statsGroupTopInviter;

export type stats_megagroupStats = {
  _: 'stats.megagroupStats';
  period: StatsDateRangeDays;
  members: StatsAbsValueAndPrev;
  messages: StatsAbsValueAndPrev;
  viewers: StatsAbsValueAndPrev;
  posters: StatsAbsValueAndPrev;
  growth_graph: StatsGraph;
  members_graph: StatsGraph;
  new_members_by_source_graph: StatsGraph;
  languages_graph: StatsGraph;
  messages_graph: StatsGraph;
  actions_graph: StatsGraph;
  top_hours_graph: StatsGraph;
  weekdays_graph: StatsGraph;
  top_posters: Array<StatsGroupTopPoster>;
  top_admins: Array<StatsGroupTopAdmin>;
  top_inviters: Array<StatsGroupTopInviter>;
  users: Array<User>;
};
export type stats_MegagroupStats = stats_megagroupStats;

export type globalPrivacySettings = {
  _: 'globalPrivacySettings';
  flags?: number;
  archive_and_mute_new_noncontact_peers?: boolean;
};
export type GlobalPrivacySettings = globalPrivacySettings;

export type help_countryCode = {
  _: 'help.countryCode';
  flags?: number;
  country_code?: string;
  prefixes?: Array<string>;
  patterns?: Array<string>;
};
export type help_CountryCode = help_countryCode;

export type help_country = {
  _: 'help.country';
  flags?: number;
  hidden?: boolean;
  iso2?: string;
  default_name?: string;
  name?: string;
  country_codes: Array<help_CountryCode>;
};
export type help_Country = help_country;

export type help_countriesListNotModified = {
  _: 'help.countriesListNotModified';
};
export type help_countriesList = {
  _: 'help.countriesList';
  countries: Array<help_Country>;
  hash?: number;
};
export type help_CountriesList = help_countriesListNotModified | help_countriesList;

export type messageViews = {
  _: 'messageViews';
  flags?: number;
  views?: number;
  forwards?: number;
  replies?: MessageReplies;
};
export type MessageViews = messageViews;

export type messages_messageViews = {
  _: 'messages.messageViews';
  views: Array<MessageViews>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_MessageViews = messages_messageViews;

export type messages_discussionMessage = {
  _: 'messages.discussionMessage';
  flags?: number;
  messages: Array<Message>;
  max_id?: number;
  read_inbox_max_id?: number;
  read_outbox_max_id?: number;
  unread_count?: number;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_DiscussionMessage = messages_discussionMessage;

export type messageReplyHeader = {
  _: 'messageReplyHeader';
  flags?: number;
  reply_to_scheduled?: boolean;
  forum_topic?: boolean;
  reply_to_msg_id?: number;
  reply_to_peer_id?: Peer;
  reply_to_top_id?: number;
};
export type MessageReplyHeader = messageReplyHeader;

export type messageReplies = {
  _: 'messageReplies';
  flags?: number;
  comments?: boolean;
  replies?: number;
  replies_pts?: number;
  recent_repliers?: Array<Peer>;
  channel_id?: number;
  max_id?: number;
  read_max_id?: number;
};
export type MessageReplies = messageReplies;

export type peerBlocked = {
  _: 'peerBlocked';
  peer_id: Peer;
  date?: number;
};
export type PeerBlocked = peerBlocked;

export type stats_messageStats = {
  _: 'stats.messageStats';
  views_graph: StatsGraph;
};
export type stats_MessageStats = stats_messageStats;

export type groupCallDiscarded = {
  _: 'groupCallDiscarded';
  id?: number;
  access_hash?: number;
  duration?: number;
};
export type groupCall = {
  _: 'groupCall';
  flags?: number;
  join_muted?: boolean;
  can_change_join_muted?: boolean;
  join_date_asc?: boolean;
  schedule_start_subscribed?: boolean;
  can_start_video?: boolean;
  record_video_active?: boolean;
  rtmp_stream?: boolean;
  listeners_hidden?: boolean;
  id?: number;
  access_hash?: number;
  participants_count?: number;
  title?: string;
  stream_dc_id?: number;
  record_start_date?: number;
  schedule_date?: number;
  unmuted_video_count?: number;
  unmuted_video_limit?: number;
  version?: number;
};
export type GroupCall = groupCallDiscarded | groupCall;

export type inputGroupCall = {
  _: 'inputGroupCall';
  id?: number;
  access_hash?: number;
};
export type InputGroupCall = inputGroupCall;

export type groupCallParticipant = {
  _: 'groupCallParticipant';
  flags?: number;
  muted?: boolean;
  left?: boolean;
  can_self_unmute?: boolean;
  just_joined?: boolean;
  versioned?: boolean;
  min?: boolean;
  muted_by_you?: boolean;
  volume_by_admin?: boolean;
  self?: boolean;
  video_joined?: boolean;
  peer: Peer;
  date?: number;
  active_date?: number;
  source?: number;
  volume?: number;
  about?: string;
  raise_hand_rating?: number;
  video?: GroupCallParticipantVideo;
  presentation?: GroupCallParticipantVideo;
};
export type GroupCallParticipant = groupCallParticipant;

export type phone_groupCall = {
  _: 'phone.groupCall';
  call: GroupCall;
  participants: Array<GroupCallParticipant>;
  participants_next_offset?: string;
  chats: Array<Chat>;
  users: Array<User>;
};
export type phone_GroupCall = phone_groupCall;

export type phone_groupParticipants = {
  _: 'phone.groupParticipants';
  count?: number;
  participants: Array<GroupCallParticipant>;
  next_offset?: string;
  chats: Array<Chat>;
  users: Array<User>;
  version?: number;
};
export type phone_GroupParticipants = phone_groupParticipants;

export type inlineQueryPeerTypeSameBotPM = {
  _: 'inlineQueryPeerTypeSameBotPM';
};
export type inlineQueryPeerTypePM = {
  _: 'inlineQueryPeerTypePM';
};
export type inlineQueryPeerTypeChat = {
  _: 'inlineQueryPeerTypeChat';
};
export type inlineQueryPeerTypeMegagroup = {
  _: 'inlineQueryPeerTypeMegagroup';
};
export type inlineQueryPeerTypeBroadcast = {
  _: 'inlineQueryPeerTypeBroadcast';
};
export type inlineQueryPeerTypeBotPM = {
  _: 'inlineQueryPeerTypeBotPM';
};
export type InlineQueryPeerType = inlineQueryPeerTypeSameBotPM | inlineQueryPeerTypePM | inlineQueryPeerTypeChat | inlineQueryPeerTypeMegagroup | inlineQueryPeerTypeBroadcast | inlineQueryPeerTypeBotPM;

export type messages_historyImport = {
  _: 'messages.historyImport';
  id?: number;
};
export type messages_HistoryImport = messages_historyImport;

export type messages_historyImportParsed = {
  _: 'messages.historyImportParsed';
  flags?: number;
  pm?: boolean;
  group?: boolean;
  title?: string;
};
export type messages_HistoryImportParsed = messages_historyImportParsed;

export type messages_affectedFoundMessages = {
  _: 'messages.affectedFoundMessages';
  pts?: number;
  pts_count?: number;
  offset?: number;
  messages?: Array<number>;
};
export type messages_AffectedFoundMessages = messages_affectedFoundMessages;

export type chatInviteImporter = {
  _: 'chatInviteImporter';
  flags?: number;
  requested?: boolean;
  via_chatlist?: boolean;
  user_id?: number;
  date?: number;
  about?: string;
  approved_by?: number;
};
export type ChatInviteImporter = chatInviteImporter;

export type messages_exportedChatInvites = {
  _: 'messages.exportedChatInvites';
  count?: number;
  invites: Array<ExportedChatInvite>;
  users: Array<User>;
};
export type messages_ExportedChatInvites = messages_exportedChatInvites;

export type messages_exportedChatInvite = {
  _: 'messages.exportedChatInvite';
  invite: ExportedChatInvite;
  users: Array<User>;
};
export type messages_exportedChatInviteReplaced = {
  _: 'messages.exportedChatInviteReplaced';
  invite: ExportedChatInvite;
  new_invite: ExportedChatInvite;
  users: Array<User>;
};
export type messages_ExportedChatInvite = messages_exportedChatInvite | messages_exportedChatInviteReplaced;

export type messages_chatInviteImporters = {
  _: 'messages.chatInviteImporters';
  count?: number;
  importers: Array<ChatInviteImporter>;
  users: Array<User>;
};
export type messages_ChatInviteImporters = messages_chatInviteImporters;

export type chatAdminWithInvites = {
  _: 'chatAdminWithInvites';
  admin_id?: number;
  invites_count?: number;
  revoked_invites_count?: number;
};
export type ChatAdminWithInvites = chatAdminWithInvites;

export type messages_chatAdminsWithInvites = {
  _: 'messages.chatAdminsWithInvites';
  admins: Array<ChatAdminWithInvites>;
  users: Array<User>;
};
export type messages_ChatAdminsWithInvites = messages_chatAdminsWithInvites;

export type messages_checkedHistoryImportPeer = {
  _: 'messages.checkedHistoryImportPeer';
  confirm_text?: string;
};
export type messages_CheckedHistoryImportPeer = messages_checkedHistoryImportPeer;

export type phone_joinAsPeers = {
  _: 'phone.joinAsPeers';
  peers: Array<Peer>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type phone_JoinAsPeers = phone_joinAsPeers;

export type phone_exportedGroupCallInvite = {
  _: 'phone.exportedGroupCallInvite';
  link?: string;
};
export type phone_ExportedGroupCallInvite = phone_exportedGroupCallInvite;

export type groupCallParticipantVideoSourceGroup = {
  _: 'groupCallParticipantVideoSourceGroup';
  semantics?: string;
  sources?: Array<number>;
};
export type GroupCallParticipantVideoSourceGroup = groupCallParticipantVideoSourceGroup;

export type groupCallParticipantVideo = {
  _: 'groupCallParticipantVideo';
  flags?: number;
  paused?: boolean;
  endpoint?: string;
  source_groups: Array<GroupCallParticipantVideoSourceGroup>;
  audio_source?: number;
};
export type GroupCallParticipantVideo = groupCallParticipantVideo;

export type stickers_suggestedShortName = {
  _: 'stickers.suggestedShortName';
  short_name?: string;
};
export type stickers_SuggestedShortName = stickers_suggestedShortName;

export type botCommandScopeDefault = {
  _: 'botCommandScopeDefault';
};
export type botCommandScopeUsers = {
  _: 'botCommandScopeUsers';
};
export type botCommandScopeChats = {
  _: 'botCommandScopeChats';
};
export type botCommandScopeChatAdmins = {
  _: 'botCommandScopeChatAdmins';
};
export type botCommandScopePeer = {
  _: 'botCommandScopePeer';
  peer: InputPeer;
};
export type botCommandScopePeerAdmins = {
  _: 'botCommandScopePeerAdmins';
  peer: InputPeer;
};
export type botCommandScopePeerUser = {
  _: 'botCommandScopePeerUser';
  peer: InputPeer;
  user_id: InputUser;
};
export type BotCommandScope = botCommandScopeDefault | botCommandScopeUsers | botCommandScopeChats | botCommandScopeChatAdmins | botCommandScopePeer | botCommandScopePeerAdmins | botCommandScopePeerUser;

export type account_resetPasswordFailedWait = {
  _: 'account.resetPasswordFailedWait';
  retry_date?: number;
};
export type account_resetPasswordRequestedWait = {
  _: 'account.resetPasswordRequestedWait';
  until_date?: number;
};
export type account_resetPasswordOk = {
  _: 'account.resetPasswordOk';
};
export type account_ResetPasswordResult = account_resetPasswordFailedWait | account_resetPasswordRequestedWait | account_resetPasswordOk;

export type sponsoredMessage = {
  _: 'sponsoredMessage';
  flags?: number;
  recommended?: boolean;
  show_peer_photo?: boolean;
  random_id?: Uint8Array;
  from_id?: Peer;
  chat_invite?: ChatInvite;
  chat_invite_hash?: string;
  channel_post?: number;
  start_param?: string;
  message?: string;
  entities?: Array<MessageEntity>;
  sponsor_info?: string;
  additional_info?: string;
};
export type SponsoredMessage = sponsoredMessage;

export type messages_sponsoredMessages = {
  _: 'messages.sponsoredMessages';
  flags?: number;
  posts_between?: number;
  messages: Array<SponsoredMessage>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_sponsoredMessagesEmpty = {
  _: 'messages.sponsoredMessagesEmpty';
};
export type messages_SponsoredMessages = messages_sponsoredMessages | messages_sponsoredMessagesEmpty;

export type searchResultsCalendarPeriod = {
  _: 'searchResultsCalendarPeriod';
  date?: number;
  min_msg_id?: number;
  max_msg_id?: number;
  count?: number;
};
export type SearchResultsCalendarPeriod = searchResultsCalendarPeriod;

export type messages_searchResultsCalendar = {
  _: 'messages.searchResultsCalendar';
  flags?: number;
  inexact?: boolean;
  count?: number;
  min_date?: number;
  min_msg_id?: number;
  offset_id_offset?: number;
  periods: Array<SearchResultsCalendarPeriod>;
  messages: Array<Message>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_SearchResultsCalendar = messages_searchResultsCalendar;

export type searchResultPosition = {
  _: 'searchResultPosition';
  msg_id?: number;
  date?: number;
  offset?: number;
};
export type SearchResultsPosition = searchResultPosition;

export type messages_searchResultsPositions = {
  _: 'messages.searchResultsPositions';
  count?: number;
  positions: Array<SearchResultsPosition>;
};
export type messages_SearchResultsPositions = messages_searchResultsPositions;

export type channels_sendAsPeers = {
  _: 'channels.sendAsPeers';
  peers: Array<SendAsPeer>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type channels_SendAsPeers = channels_sendAsPeers;

export type users_userFull = {
  _: 'users.userFull';
  full_user: UserFull;
  chats: Array<Chat>;
  users: Array<User>;
};
export type users_UserFull = users_userFull;

export type messages_peerSettings = {
  _: 'messages.peerSettings';
  settings: PeerSettings;
  chats: Array<Chat>;
  users: Array<User>;
};
export type messages_PeerSettings = messages_peerSettings;

export type auth_loggedOut = {
  _: 'auth.loggedOut';
  flags?: number;
  future_auth_token?: Uint8Array;
};
export type auth_LoggedOut = auth_loggedOut;

export type reactionCount = {
  _: 'reactionCount';
  flags?: number;
  chosen_order?: number;
  reaction: Reaction;
  count?: number;
};
export type ReactionCount = reactionCount;

export type messageReactions = {
  _: 'messageReactions';
  flags?: number;
  min?: boolean;
  can_see_list?: boolean;
  results: Array<ReactionCount>;
  recent_reactions?: Array<MessagePeerReaction>;
};
export type MessageReactions = messageReactions;

export type messages_messageReactionsList = {
  _: 'messages.messageReactionsList';
  flags?: number;
  count?: number;
  reactions: Array<MessagePeerReaction>;
  chats: Array<Chat>;
  users: Array<User>;
  next_offset?: string;
};
export type messages_MessageReactionsList = messages_messageReactionsList;

export type availableReaction = {
  _: 'availableReaction';
  flags?: number;
  inactive?: boolean;
  premium?: boolean;
  reaction?: string;
  title?: string;
  static_icon: Document;
  appear_animation: Document;
  select_animation: Document;
  activate_animation: Document;
  effect_animation: Document;
  around_animation?: Document;
  center_icon?: Document;
};
export type AvailableReaction = availableReaction;

export type messages_availableReactionsNotModified = {
  _: 'messages.availableReactionsNotModified';
};
export type messages_availableReactions = {
  _: 'messages.availableReactions';
  hash?: number;
  reactions: Array<AvailableReaction>;
};
export type messages_AvailableReactions = messages_availableReactionsNotModified | messages_availableReactions;

export type messagePeerReaction = {
  _: 'messagePeerReaction';
  flags?: number;
  big?: boolean;
  unread?: boolean;
  my?: boolean;
  peer_id: Peer;
  date?: number;
  reaction: Reaction;
};
export type MessagePeerReaction = messagePeerReaction;

export type groupCallStreamChannel = {
  _: 'groupCallStreamChannel';
  channel?: number;
  scale?: number;
  last_timestamp_ms?: number;
};
export type GroupCallStreamChannel = groupCallStreamChannel;

export type phone_groupCallStreamChannels = {
  _: 'phone.groupCallStreamChannels';
  channels: Array<GroupCallStreamChannel>;
};
export type phone_GroupCallStreamChannels = phone_groupCallStreamChannels;

export type phone_groupCallStreamRtmpUrl = {
  _: 'phone.groupCallStreamRtmpUrl';
  url?: string;
  key?: string;
};
export type phone_GroupCallStreamRtmpUrl = phone_groupCallStreamRtmpUrl;

export type attachMenuBotIconColor = {
  _: 'attachMenuBotIconColor';
  name?: string;
  color?: number;
};
export type AttachMenuBotIconColor = attachMenuBotIconColor;

export type attachMenuBotIcon = {
  _: 'attachMenuBotIcon';
  flags?: number;
  name?: string;
  icon: Document;
  colors?: Array<AttachMenuBotIconColor>;
};
export type AttachMenuBotIcon = attachMenuBotIcon;

export type attachMenuBot = {
  _: 'attachMenuBot';
  flags?: number;
  inactive?: boolean;
  has_settings?: boolean;
  request_write_access?: boolean;
  bot_id?: number;
  short_name?: string;
  peer_types: Array<AttachMenuPeerType>;
  icons: Array<AttachMenuBotIcon>;
};
export type AttachMenuBot = attachMenuBot;

export type attachMenuBotsNotModified = {
  _: 'attachMenuBotsNotModified';
};
export type attachMenuBots = {
  _: 'attachMenuBots';
  hash?: number;
  bots: Array<AttachMenuBot>;
  users: Array<User>;
};
export type AttachMenuBots = attachMenuBotsNotModified | attachMenuBots;

export type attachMenuBotsBot = {
  _: 'attachMenuBotsBot';
  bot: AttachMenuBot;
  users: Array<User>;
};
export type AttachMenuBotsBot = attachMenuBotsBot;

export type webViewResultUrl = {
  _: 'webViewResultUrl';
  query_id?: number;
  url?: string;
};
export type WebViewResult = webViewResultUrl;

export type simpleWebViewResultUrl = {
  _: 'simpleWebViewResultUrl';
  url?: string;
};
export type SimpleWebViewResult = simpleWebViewResultUrl;

export type webViewMessageSent = {
  _: 'webViewMessageSent';
  flags?: number;
  msg_id?: InputBotInlineMessageID;
};
export type WebViewMessageSent = webViewMessageSent;

export type botMenuButtonDefault = {
  _: 'botMenuButtonDefault';
};
export type botMenuButtonCommands = {
  _: 'botMenuButtonCommands';
};
export type botMenuButton = {
  _: 'botMenuButton';
  text?: string;
  url?: string;
};
export type BotMenuButton = botMenuButtonDefault | botMenuButtonCommands | botMenuButton;

export type account_savedRingtonesNotModified = {
  _: 'account.savedRingtonesNotModified';
};
export type account_savedRingtones = {
  _: 'account.savedRingtones';
  hash?: number;
  ringtones: Array<Document>;
};
export type account_SavedRingtones = account_savedRingtonesNotModified | account_savedRingtones;

export type notificationSoundDefault = {
  _: 'notificationSoundDefault';
};
export type notificationSoundNone = {
  _: 'notificationSoundNone';
};
export type notificationSoundLocal = {
  _: 'notificationSoundLocal';
  title?: string;
  data?: string;
};
export type notificationSoundRingtone = {
  _: 'notificationSoundRingtone';
  id?: number;
};
export type NotificationSound = notificationSoundDefault | notificationSoundNone | notificationSoundLocal | notificationSoundRingtone;

export type account_savedRingtone = {
  _: 'account.savedRingtone';
};
export type account_savedRingtoneConverted = {
  _: 'account.savedRingtoneConverted';
  document: Document;
};
export type account_SavedRingtone = account_savedRingtone | account_savedRingtoneConverted;

export type attachMenuPeerTypeSameBotPM = {
  _: 'attachMenuPeerTypeSameBotPM';
};
export type attachMenuPeerTypeBotPM = {
  _: 'attachMenuPeerTypeBotPM';
};
export type attachMenuPeerTypePM = {
  _: 'attachMenuPeerTypePM';
};
export type attachMenuPeerTypeChat = {
  _: 'attachMenuPeerTypeChat';
};
export type attachMenuPeerTypeBroadcast = {
  _: 'attachMenuPeerTypeBroadcast';
};
export type AttachMenuPeerType = attachMenuPeerTypeSameBotPM | attachMenuPeerTypeBotPM | attachMenuPeerTypePM | attachMenuPeerTypeChat | attachMenuPeerTypeBroadcast;

export type inputInvoiceMessage = {
  _: 'inputInvoiceMessage';
  peer: InputPeer;
  msg_id?: number;
};
export type inputInvoiceSlug = {
  _: 'inputInvoiceSlug';
  slug?: string;
};
export type InputInvoice = inputInvoiceMessage | inputInvoiceSlug;

export type payments_exportedInvoice = {
  _: 'payments.exportedInvoice';
  url?: string;
};
export type payments_ExportedInvoice = payments_exportedInvoice;

export type messages_transcribedAudio = {
  _: 'messages.transcribedAudio';
  flags?: number;
  pending?: boolean;
  transcription_id?: number;
  text?: string;
};
export type messages_TranscribedAudio = messages_transcribedAudio;

export type help_premiumPromo = {
  _: 'help.premiumPromo';
  status_text?: string;
  status_entities: Array<MessageEntity>;
  video_sections?: Array<string>;
  videos: Array<Document>;
  period_options: Array<PremiumSubscriptionOption>;
  users: Array<User>;
};
export type help_PremiumPromo = help_premiumPromo;

export type inputStorePaymentPremiumSubscription = {
  _: 'inputStorePaymentPremiumSubscription';
  flags?: number;
  restore?: boolean;
  upgrade?: boolean;
};
export type inputStorePaymentGiftPremium = {
  _: 'inputStorePaymentGiftPremium';
  user_id: InputUser;
  currency?: string;
  amount?: number;
};
export type InputStorePaymentPurpose = inputStorePaymentPremiumSubscription | inputStorePaymentGiftPremium;

export type premiumGiftOption = {
  _: 'premiumGiftOption';
  flags?: number;
  months?: number;
  currency?: string;
  amount?: number;
  bot_url?: string;
  store_product?: string;
};
export type PremiumGiftOption = premiumGiftOption;

export type paymentFormMethod = {
  _: 'paymentFormMethod';
  url?: string;
  title?: string;
};
export type PaymentFormMethod = paymentFormMethod;

export type emojiStatusEmpty = {
  _: 'emojiStatusEmpty';
};
export type emojiStatus = {
  _: 'emojiStatus';
  document_id?: number;
};
export type emojiStatusUntil = {
  _: 'emojiStatusUntil';
  document_id?: number;
  until?: number;
};
export type EmojiStatus = emojiStatusEmpty | emojiStatus | emojiStatusUntil;

export type account_emojiStatusesNotModified = {
  _: 'account.emojiStatusesNotModified';
};
export type account_emojiStatuses = {
  _: 'account.emojiStatuses';
  hash?: number;
  statuses: Array<EmojiStatus>;
};
export type account_EmojiStatuses = account_emojiStatusesNotModified | account_emojiStatuses;

export type reactionEmpty = {
  _: 'reactionEmpty';
};
export type reactionEmoji = {
  _: 'reactionEmoji';
  emoticon?: string;
};
export type reactionCustomEmoji = {
  _: 'reactionCustomEmoji';
  document_id?: number;
};
export type Reaction = reactionEmpty | reactionEmoji | reactionCustomEmoji;

export type chatReactionsNone = {
  _: 'chatReactionsNone';
};
export type chatReactionsAll = {
  _: 'chatReactionsAll';
  flags?: number;
  allow_custom?: boolean;
};
export type chatReactionsSome = {
  _: 'chatReactionsSome';
  reactions: Array<Reaction>;
};
export type ChatReactions = chatReactionsNone | chatReactionsAll | chatReactionsSome;

export type messages_reactionsNotModified = {
  _: 'messages.reactionsNotModified';
};
export type messages_reactions = {
  _: 'messages.reactions';
  hash?: number;
  reactions: Array<Reaction>;
};
export type messages_Reactions = messages_reactionsNotModified | messages_reactions;

export type emailVerifyPurposeLoginSetup = {
  _: 'emailVerifyPurposeLoginSetup';
  phone_number?: string;
  phone_code_hash?: string;
};
export type emailVerifyPurposeLoginChange = {
  _: 'emailVerifyPurposeLoginChange';
};
export type emailVerifyPurposePassport = {
  _: 'emailVerifyPurposePassport';
};
export type EmailVerifyPurpose = emailVerifyPurposeLoginSetup | emailVerifyPurposeLoginChange | emailVerifyPurposePassport;

export type emailVerificationCode = {
  _: 'emailVerificationCode';
  code?: string;
};
export type emailVerificationGoogle = {
  _: 'emailVerificationGoogle';
  token?: string;
};
export type emailVerificationApple = {
  _: 'emailVerificationApple';
  token?: string;
};
export type EmailVerification = emailVerificationCode | emailVerificationGoogle | emailVerificationApple;

export type account_emailVerified = {
  _: 'account.emailVerified';
  email?: string;
};
export type account_emailVerifiedLogin = {
  _: 'account.emailVerifiedLogin';
  email?: string;
  sent_code: auth_SentCode;
};
export type account_EmailVerified = account_emailVerified | account_emailVerifiedLogin;

export type premiumSubscriptionOption = {
  _: 'premiumSubscriptionOption';
  flags?: number;
  current?: boolean;
  can_purchase_upgrade?: boolean;
  transaction?: string;
  months?: number;
  currency?: string;
  amount?: number;
  bot_url?: string;
  store_product?: string;
};
export type PremiumSubscriptionOption = premiumSubscriptionOption;

export type sendAsPeer = {
  _: 'sendAsPeer';
  flags?: number;
  premium_required?: boolean;
  peer: Peer;
};
export type SendAsPeer = sendAsPeer;

export type messageExtendedMediaPreview = {
  _: 'messageExtendedMediaPreview';
  flags?: number;
  w?: number;
  h?: number;
  thumb?: PhotoSize;
  video_duration?: number;
};
export type messageExtendedMedia = {
  _: 'messageExtendedMedia';
  media: MessageMedia;
};
export type MessageExtendedMedia = messageExtendedMediaPreview | messageExtendedMedia;

export type stickerKeyword = {
  _: 'stickerKeyword';
  document_id?: number;
  keyword?: Array<string>;
};
export type StickerKeyword = stickerKeyword;

export type username = {
  _: 'username';
  flags?: number;
  editable?: boolean;
  active?: boolean;
  username?: string;
};
export type Username = username;

export type forumTopicDeleted = {
  _: 'forumTopicDeleted';
  id?: number;
};
export type forumTopic = {
  _: 'forumTopic';
  flags?: number;
  my?: boolean;
  closed?: boolean;
  pinned?: boolean;
  short?: boolean;
  hidden?: boolean;
  id?: number;
  date?: number;
  title?: string;
  icon_color?: number;
  icon_emoji_id?: number;
  top_message?: number;
  read_inbox_max_id?: number;
  read_outbox_max_id?: number;
  unread_count?: number;
  unread_mentions_count?: number;
  unread_reactions_count?: number;
  from_id: Peer;
  notify_settings: PeerNotifySettings;
  draft?: DraftMessage;
};
export type ForumTopic = forumTopicDeleted | forumTopic;

export type messages_forumTopics = {
  _: 'messages.forumTopics';
  flags?: number;
  order_by_create_date?: boolean;
  count?: number;
  topics: Array<ForumTopic>;
  messages: Array<Message>;
  chats: Array<Chat>;
  users: Array<User>;
  pts?: number;
};
export type messages_ForumTopics = messages_forumTopics;

export type defaultHistoryTTL = {
  _: 'defaultHistoryTTL';
  period?: number;
};
export type DefaultHistoryTTL = defaultHistoryTTL;

export type exportedContactToken = {
  _: 'exportedContactToken';
  url?: string;
  expires?: number;
};
export type ExportedContactToken = exportedContactToken;

export type requestPeerTypeUser = {
  _: 'requestPeerTypeUser';
  flags?: number;
  bot?: boolean;
  premium?: boolean;
};
export type requestPeerTypeChat = {
  _: 'requestPeerTypeChat';
  flags?: number;
  creator?: boolean;
  bot_participant?: boolean;
  has_username?: boolean;
  forum?: boolean;
  user_admin_rights?: ChatAdminRights;
  bot_admin_rights?: ChatAdminRights;
};
export type requestPeerTypeBroadcast = {
  _: 'requestPeerTypeBroadcast';
  flags?: number;
  creator?: boolean;
  has_username?: boolean;
  user_admin_rights?: ChatAdminRights;
  bot_admin_rights?: ChatAdminRights;
};
export type RequestPeerType = requestPeerTypeUser | requestPeerTypeChat | requestPeerTypeBroadcast;

export type emojiListNotModified = {
  _: 'emojiListNotModified';
};
export type emojiList = {
  _: 'emojiList';
  hash?: number;
  document_id?: Array<number>;
};
export type EmojiList = emojiListNotModified | emojiList;

export type emojiGroup = {
  _: 'emojiGroup';
  title?: string;
  icon_emoji_id?: number;
  emoticons?: Array<string>;
};
export type EmojiGroup = emojiGroup;

export type messages_emojiGroupsNotModified = {
  _: 'messages.emojiGroupsNotModified';
};
export type messages_emojiGroups = {
  _: 'messages.emojiGroups';
  hash?: number;
  groups: Array<EmojiGroup>;
};
export type messages_EmojiGroups = messages_emojiGroupsNotModified | messages_emojiGroups;

export type textWithEntities = {
  _: 'textWithEntities';
  text?: string;
  entities: Array<MessageEntity>;
};
export type TextWithEntities = textWithEntities;

export type messages_translateResult = {
  _: 'messages.translateResult';
  result: Array<TextWithEntities>;
};
export type messages_TranslatedText = messages_translateResult;

export type autoSaveSettings = {
  _: 'autoSaveSettings';
  flags?: number;
  photos?: boolean;
  videos?: boolean;
  video_max_size?: number;
};
export type AutoSaveSettings = autoSaveSettings;

export type autoSaveException = {
  _: 'autoSaveException';
  peer: Peer;
  settings: AutoSaveSettings;
};
export type AutoSaveException = autoSaveException;

export type account_autoSaveSettings = {
  _: 'account.autoSaveSettings';
  users_settings: AutoSaveSettings;
  chats_settings: AutoSaveSettings;
  broadcasts_settings: AutoSaveSettings;
  exceptions: Array<AutoSaveException>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type account_AutoSaveSettings = account_autoSaveSettings;

export type help_appConfigNotModified = {
  _: 'help.appConfigNotModified';
};
export type help_appConfig = {
  _: 'help.appConfig';
  hash?: number;
  config: JSONValue;
};
export type help_AppConfig = help_appConfigNotModified | help_appConfig;

export type inputBotAppID = {
  _: 'inputBotAppID';
  id?: number;
  access_hash?: number;
};
export type inputBotAppShortName = {
  _: 'inputBotAppShortName';
  bot_id: InputUser;
  short_name?: string;
};
export type InputBotApp = inputBotAppID | inputBotAppShortName;

export type botAppNotModified = {
  _: 'botAppNotModified';
};
export type botApp = {
  _: 'botApp';
  flags?: number;
  id?: number;
  access_hash?: number;
  short_name?: string;
  title?: string;
  description?: string;
  photo: Photo;
  document?: Document;
  hash?: number;
};
export type BotApp = botAppNotModified | botApp;

export type messages_botApp = {
  _: 'messages.botApp';
  flags?: number;
  inactive?: boolean;
  request_write_access?: boolean;
  app: BotApp;
};
export type messages_BotApp = messages_botApp;

export type appWebViewResultUrl = {
  _: 'appWebViewResultUrl';
  url?: string;
};
export type AppWebViewResult = appWebViewResultUrl;

export type inlineBotWebView = {
  _: 'inlineBotWebView';
  text?: string;
  url?: string;
};
export type InlineBotWebView = inlineBotWebView;

export type readParticipantDate = {
  _: 'readParticipantDate';
  user_id?: number;
  date?: number;
};
export type ReadParticipantDate = readParticipantDate;

export type inputChatlistDialogFilter = {
  _: 'inputChatlistDialogFilter';
  filter_id?: number;
};
export type InputChatlist = inputChatlistDialogFilter;

export type exportedChatlistInvite = {
  _: 'exportedChatlistInvite';
  flags?: number;
  title?: string;
  url?: string;
  peers: Array<Peer>;
};
export type ExportedChatlistInvite = exportedChatlistInvite;

export type chatlists_exportedChatlistInvite = {
  _: 'chatlists.exportedChatlistInvite';
  filter: DialogFilter;
  invite: ExportedChatlistInvite;
};
export type chatlists_ExportedChatlistInvite = chatlists_exportedChatlistInvite;

export type chatlists_exportedInvites = {
  _: 'chatlists.exportedInvites';
  invites: Array<ExportedChatlistInvite>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type chatlists_ExportedInvites = chatlists_exportedInvites;

export type chatlists_chatlistInviteAlready = {
  _: 'chatlists.chatlistInviteAlready';
  filter_id?: number;
  missing_peers: Array<Peer>;
  already_peers: Array<Peer>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type chatlists_chatlistInvite = {
  _: 'chatlists.chatlistInvite';
  flags?: number;
  title?: string;
  emoticon?: string;
  peers: Array<Peer>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type chatlists_ChatlistInvite = chatlists_chatlistInviteAlready | chatlists_chatlistInvite;

export type chatlists_chatlistUpdates = {
  _: 'chatlists.chatlistUpdates';
  missing_peers: Array<Peer>;
  chats: Array<Chat>;
  users: Array<User>;
};
export type chatlists_ChatlistUpdates = chatlists_chatlistUpdates;

export type bots_botInfo = {
  _: 'bots.botInfo';
  name?: string;
  about?: string;
  description?: string;
};
export type bots_BotInfo = bots_botInfo;
