const parserMap = new Map([
  [481674261, function() {
return this.vector(this.predicate, true);
  }],
  [85337187, function() {
const result = { _: 'mt_resPQ' };
result.nonce = this.int128();
result.server_nonce = this.int128();
result.pq = this.bytes();
result.server_public_key_fingerprints = this.vector(this.long, false);
return result;
  }],
  [2211011308, function() {
const result = { _: 'mt_p_q_inner_data' };
result.pq = this.bytes();
result.p = this.bytes();
result.q = this.bytes();
result.nonce = this.int128();
result.server_nonce = this.int128();
result.new_nonce = this.int256();
return result;
  }],
  [2851430293, function() {
const result = { _: 'mt_p_q_inner_data_dc' };
result.pq = this.bytes();
result.p = this.bytes();
result.q = this.bytes();
result.nonce = this.int128();
result.server_nonce = this.int128();
result.new_nonce = this.int256();
result.dc = this.int();
return result;
  }],
  [1013613780, function() {
const result = { _: 'mt_p_q_inner_data_temp' };
result.pq = this.bytes();
result.p = this.bytes();
result.q = this.bytes();
result.nonce = this.int128();
result.server_nonce = this.int128();
result.new_nonce = this.int256();
result.expires_in = this.int();
return result;
  }],
  [1459478408, function() {
const result = { _: 'mt_p_q_inner_data_temp_dc' };
result.pq = this.bytes();
result.p = this.bytes();
result.q = this.bytes();
result.nonce = this.int128();
result.server_nonce = this.int128();
result.new_nonce = this.int256();
result.dc = this.int();
result.expires_in = this.int();
return result;
  }],
  [2043348061, function() {
const result = { _: 'mt_server_DH_params_fail' };
result.nonce = this.int128();
result.server_nonce = this.int128();
result.new_nonce_hash = this.int128();
return result;
  }],
  [3504867164, function() {
const result = { _: 'mt_server_DH_params_ok' };
result.nonce = this.int128();
result.server_nonce = this.int128();
result.encrypted_answer = this.bytes();
return result;
  }],
  [3045658042, function() {
const result = { _: 'mt_server_DH_inner_data' };
result.nonce = this.int128();
result.server_nonce = this.int128();
result.g = this.int();
result.dh_prime = this.bytes();
result.g_a = this.bytes();
result.server_time = this.int();
return result;
  }],
  [1715713620, function() {
const result = { _: 'mt_client_DH_inner_data' };
result.nonce = this.int128();
result.server_nonce = this.int128();
result.retry_id = this.long();
result.g_b = this.bytes();
return result;
  }],
  [1003222836, function() {
const result = { _: 'mt_dh_gen_ok' };
result.nonce = this.int128();
result.server_nonce = this.int128();
result.new_nonce_hash1 = this.int128();
return result;
  }],
  [1188831161, function() {
const result = { _: 'mt_dh_gen_retry' };
result.nonce = this.int128();
result.server_nonce = this.int128();
result.new_nonce_hash2 = this.int128();
return result;
  }],
  [2795351554, function() {
const result = { _: 'mt_dh_gen_fail' };
result.nonce = this.int128();
result.server_nonce = this.int128();
result.new_nonce_hash3 = this.int128();
return result;
  }],
  [4082920705, function() {
const result = { _: 'mt_rpc_result' };
result.req_msg_id = this.long();
result.result = this.predicate();
return result;
  }],
  [558156313, function() {
const result = { _: 'mt_rpc_error' };
result.error_code = this.int();
result.error_message = this.string();
return result;
  }],
  [1579864942, function() {
const result = { _: 'mt_rpc_answer_unknown' };
return result;
  }],
  [3447252358, function() {
const result = { _: 'mt_rpc_answer_dropped_running' };
return result;
  }],
  [2755319991, function() {
const result = { _: 'mt_rpc_answer_dropped' };
result.msg_id = this.long();
result.seq_no = this.int();
result.bytes = this.int();
return result;
  }],
  [155834844, function() {
const result = { _: 'mt_future_salt' };
result.valid_since = this.int();
result.valid_until = this.int();
result.salt = this.long();
return result;
  }],
  [2924480661, function() {
const result = { _: 'mt_future_salts' };
result.req_msg_id = this.long();
result.now = this.int();
result.salts = this.vector(this.predicate, false);
return result;
  }],
  [880243653, function() {
const result = { _: 'mt_pong' };
result.msg_id = this.long();
result.ping_id = this.long();
return result;
  }],
  [2663516424, function() {
const result = { _: 'mt_new_session_created' };
result.first_msg_id = this.long();
result.unique_id = this.long();
result.server_salt = this.long();
return result;
  }],
  [1945237724, function() {
const result = { _: 'mt_msg_container' };
result.messages = this.vector(this.mt_message, true);
return result;
  }],
  [1538843921, function() {
const result = { _: 'mt_message' };
result.msg_id = this.long();
result.seqno = this.int();
result.bytes = this.int();
result.body = this.predicate();
return result;
  }],
  [3764405938, function() {
const result = { _: 'mt_msg_copy' };
result.orig_message = this.predicate();
return result;
  }],
  [812830625, function() {
return this.gzip();
  }],
  [1658238041, function() {
const result = { _: 'mt_msgs_ack' };
result.msg_ids = this.vector(this.long, false);
return result;
  }],
  [2817521681, function() {
const result = { _: 'mt_bad_msg_notification' };
result.bad_msg_id = this.long();
result.bad_msg_seqno = this.int();
result.error_code = this.int();
return result;
  }],
  [3987424379, function() {
const result = { _: 'mt_bad_server_salt' };
result.bad_msg_id = this.long();
result.bad_msg_seqno = this.int();
result.error_code = this.int();
result.new_server_salt = this.long();
return result;
  }],
  [2105940488, function() {
const result = { _: 'mt_msg_resend_req' };
result.msg_ids = this.vector(this.long, false);
return result;
  }],
  [2249243371, function() {
const result = { _: 'mt_msg_resend_ans_req' };
result.msg_ids = this.vector(this.long, false);
return result;
  }],
  [3664378706, function() {
const result = { _: 'mt_msgs_state_req' };
result.msg_ids = this.vector(this.long, false);
return result;
  }],
  [81704317, function() {
const result = { _: 'mt_msgs_state_info' };
result.req_msg_id = this.long();
result.info = this.bytes();
return result;
  }],
  [2361446705, function() {
const result = { _: 'mt_msgs_all_info' };
result.msg_ids = this.vector(this.long, false);
result.info = this.bytes();
return result;
  }],
  [661470918, function() {
const result = { _: 'mt_msg_detailed_info' };
result.msg_id = this.long();
result.answer_msg_id = this.long();
result.bytes = this.int();
result.status = this.int();
return result;
  }],
  [2157819615, function() {
const result = { _: 'mt_msg_new_detailed_info' };
result.answer_msg_id = this.long();
result.bytes = this.int();
result.status = this.int();
return result;
  }],
  [1973679973, function() {
const result = { _: 'mt_bind_auth_key_inner' };
result.nonce = this.long();
result.temp_auth_key_id = this.long();
result.perm_auth_key_id = this.long();
result.temp_session_id = this.long();
result.expires_at = this.int();
return result;
  }],
  [4133544404, function() {
const result = { _: 'mt_destroy_auth_key_ok' };
return result;
  }],
  [178201177, function() {
const result = { _: 'mt_destroy_auth_key_none' };
return result;
  }],
  [3926956819, function() {
const result = { _: 'mt_destroy_auth_key_fail' };
return result;
  }],
  [3793765884, function() {
const result = { _: 'mt_destroy_session_ok' };
result.session_id = this.long();
return result;
  }],
  [1658015945, function() {
const result = { _: 'mt_destroy_session_none' };
result.session_id = this.long();
return result;
  }],
  [3162085175, function() {
return false;
  }],
  [2574415285, function() {
return true;
  }],
  [1072550713, function() {
return true;
  }],
  [481674261, function() {
return this.vector(this.predicate, true);
  }],
  [3300522427, function() {
const result = { _: 'error' };
result.code = this.int();
result.text = this.string();
return result;
  }],
  [1450380236, function() {
return null;
  }],
  [2134579434, function() {
const result = { _: 'inputPeerEmpty' };
return result;
  }],
  [2107670217, function() {
const result = { _: 'inputPeerSelf' };
return result;
  }],
  [900291769, function() {
const result = { _: 'inputPeerChat' };
result.chat_id = this.long();
return result;
  }],
  [3112732367, function() {
const result = { _: 'inputUserEmpty' };
return result;
  }],
  [4156666175, function() {
const result = { _: 'inputUserSelf' };
return result;
  }],
  [4086478836, function() {
const result = { _: 'inputPhoneContact' };
result.client_id = this.long();
result.phone = this.string();
result.first_name = this.string();
result.last_name = this.string();
return result;
  }],
  [4113560191, function() {
const result = { _: 'inputFile' };
result.id = this.long();
result.parts = this.int();
result.name = this.string();
result.md5_checksum = this.string();
return result;
  }],
  [2523198847, function() {
const result = { _: 'inputMediaEmpty' };
return result;
  }],
  [505969924, function() {
const result = { _: 'inputMediaUploadedPhoto' };
result.flags = this.int();
result.spoiler = !!(result.flags & 4);
result.file = this.predicate();
if (result.flags & 1) result.stickers = this.vector(this.predicate);
if (result.flags & 2) result.ttl_seconds = this.int();
return result;
  }],
  [3015312949, function() {
const result = { _: 'inputMediaPhoto' };
result.flags = this.int();
result.spoiler = !!(result.flags & 2);
result.id = this.predicate();
if (result.flags & 1) result.ttl_seconds = this.int();
return result;
  }],
  [4190388548, function() {
const result = { _: 'inputMediaGeoPoint' };
result.geo_point = this.predicate();
return result;
  }],
  [4171988475, function() {
const result = { _: 'inputMediaContact' };
result.phone_number = this.string();
result.first_name = this.string();
result.last_name = this.string();
result.vcard = this.string();
return result;
  }],
  [480546647, function() {
const result = { _: 'inputChatPhotoEmpty' };
return result;
  }],
  [3184373440, function() {
const result = { _: 'inputChatUploadedPhoto' };
result.flags = this.int();
if (result.flags & 1) result.file = this.predicate();
if (result.flags & 2) result.video = this.predicate();
if (result.flags & 4) result.video_start_ts = this.double();
if (result.flags & 8) result.video_emoji_markup = this.predicate();
return result;
  }],
  [2303962423, function() {
const result = { _: 'inputChatPhoto' };
result.id = this.predicate();
return result;
  }],
  [3837862870, function() {
const result = { _: 'inputGeoPointEmpty' };
return result;
  }],
  [1210199983, function() {
const result = { _: 'inputGeoPoint' };
result.flags = this.int();
result.lat = this.double();
result.long = this.double();
if (result.flags & 1) result.accuracy_radius = this.int();
return result;
  }],
  [483901197, function() {
const result = { _: 'inputPhotoEmpty' };
return result;
  }],
  [1001634122, function() {
const result = { _: 'inputPhoto' };
result.id = this.long();
result.access_hash = this.long();
result.file_reference = this.bytes();
return result;
  }],
  [3755650017, function() {
const result = { _: 'inputFileLocation' };
result.volume_id = this.long();
result.local_id = this.int();
result.secret = this.long();
result.file_reference = this.bytes();
return result;
  }],
  [1498486562, function() {
const result = { _: 'peerUser' };
result.user_id = this.long();
return result;
  }],
  [918946202, function() {
const result = { _: 'peerChat' };
result.chat_id = this.long();
return result;
  }],
  [2861972229, function() {
const result = { _: 'storage.fileUnknown' };
return result;
  }],
  [1086091090, function() {
const result = { _: 'storage.filePartial' };
return result;
  }],
  [8322574, function() {
const result = { _: 'storage.fileJpeg' };
return result;
  }],
  [3403786975, function() {
const result = { _: 'storage.fileGif' };
return result;
  }],
  [172975040, function() {
const result = { _: 'storage.filePng' };
return result;
  }],
  [2921222285, function() {
const result = { _: 'storage.filePdf' };
return result;
  }],
  [1384777335, function() {
const result = { _: 'storage.fileMp3' };
return result;
  }],
  [1258941372, function() {
const result = { _: 'storage.fileMov' };
return result;
  }],
  [3016663268, function() {
const result = { _: 'storage.fileMp4' };
return result;
  }],
  [276907596, function() {
const result = { _: 'storage.fileWebp' };
return result;
  }],
  [3552332666, function() {
const result = { _: 'userEmpty' };
result.id = this.long();
return result;
  }],
  [1326562017, function() {
const result = { _: 'userProfilePhotoEmpty' };
return result;
  }],
  [2194798342, function() {
const result = { _: 'userProfilePhoto' };
result.flags = this.int();
result.has_video = !!(result.flags & 1);
result.personal = !!(result.flags & 4);
result.photo_id = this.long();
if (result.flags & 2) result.stripped_thumb = this.bytes();
result.dc_id = this.int();
return result;
  }],
  [164646985, function() {
const result = { _: 'userStatusEmpty' };
return result;
  }],
  [3988339017, function() {
const result = { _: 'userStatusOnline' };
result.expires = this.int();
return result;
  }],
  [9203775, function() {
const result = { _: 'userStatusOffline' };
result.was_online = this.int();
return result;
  }],
  [693512293, function() {
const result = { _: 'chatEmpty' };
result.id = this.long();
return result;
  }],
  [1103884886, function() {
const result = { _: 'chat' };
result.flags = this.int();
result.creator = !!(result.flags & 1);
result.left = !!(result.flags & 4);
result.deactivated = !!(result.flags & 32);
result.call_active = !!(result.flags & 8388608);
result.call_not_empty = !!(result.flags & 16777216);
result.noforwards = !!(result.flags & 33554432);
result.id = this.long();
result.title = this.string();
result.photo = this.predicate();
result.participants_count = this.int();
result.date = this.int();
result.version = this.int();
if (result.flags & 64) result.migrated_to = this.predicate();
if (result.flags & 16384) result.admin_rights = this.predicate();
if (result.flags & 262144) result.default_banned_rights = this.predicate();
return result;
  }],
  [1704108455, function() {
const result = { _: 'chatForbidden' };
result.id = this.long();
result.title = this.string();
return result;
  }],
  [3386052920, function() {
const result = { _: 'chatFull' };
result.flags = this.int();
result.can_set_username = !!(result.flags & 128);
result.has_scheduled = !!(result.flags & 256);
result.translations_disabled = !!(result.flags & 524288);
result.id = this.long();
result.about = this.string();
result.participants = this.predicate();
if (result.flags & 4) result.chat_photo = this.predicate();
result.notify_settings = this.predicate();
if (result.flags & 8192) result.exported_invite = this.predicate();
if (result.flags & 8) result.bot_info = this.vector(this.predicate);
if (result.flags & 64) result.pinned_msg_id = this.int();
if (result.flags & 2048) result.folder_id = this.int();
if (result.flags & 4096) result.call = this.predicate();
if (result.flags & 16384) result.ttl_period = this.int();
if (result.flags & 32768) result.groupcall_default_join_as = this.predicate();
if (result.flags & 65536) result.theme_emoticon = this.string();
if (result.flags & 131072) result.requests_pending = this.int();
if (result.flags & 131072) result.recent_requesters = this.vector(this.long);
if (result.flags & 262144) result.available_reactions = this.predicate();
return result;
  }],
  [3224190983, function() {
const result = { _: 'chatParticipant' };
result.user_id = this.long();
result.inviter_id = this.long();
result.date = this.int();
return result;
  }],
  [2271466465, function() {
const result = { _: 'chatParticipantsForbidden' };
result.flags = this.int();
result.chat_id = this.long();
if (result.flags & 1) result.self_participant = this.predicate();
return result;
  }],
  [1018991608, function() {
const result = { _: 'chatParticipants' };
result.chat_id = this.long();
result.participants = this.vector(this.predicate, false);
result.version = this.int();
return result;
  }],
  [935395612, function() {
const result = { _: 'chatPhotoEmpty' };
return result;
  }],
  [476978193, function() {
const result = { _: 'chatPhoto' };
result.flags = this.int();
result.has_video = !!(result.flags & 1);
result.photo_id = this.long();
if (result.flags & 2) result.stripped_thumb = this.bytes();
result.dc_id = this.int();
return result;
  }],
  [2426849924, function() {
const result = { _: 'messageEmpty' };
result.flags = this.int();
result.id = this.int();
if (result.flags & 1) result.peer_id = this.predicate();
return result;
  }],
  [1992213009, function() {
const result = { _: 'message' };
result.flags = this.int();
result.out = !!(result.flags & 2);
result.mentioned = !!(result.flags & 16);
result.media_unread = !!(result.flags & 32);
result.silent = !!(result.flags & 8192);
result.post = !!(result.flags & 16384);
result.from_scheduled = !!(result.flags & 262144);
result.legacy = !!(result.flags & 524288);
result.edit_hide = !!(result.flags & 2097152);
result.pinned = !!(result.flags & 16777216);
result.noforwards = !!(result.flags & 67108864);
result.invert_media = !!(result.flags & 134217728);
result.id = this.int();
if (result.flags & 256) result.from_id = this.predicate();
result.peer_id = this.predicate();
if (result.flags & 268435456) result.saved_peer_id = this.predicate();
if (result.flags & 4) result.fwd_from = this.predicate();
if (result.flags & 2048) result.via_bot_id = this.long();
if (result.flags & 8) result.reply_to = this.predicate();
result.date = this.int();
result.message = this.string();
if (result.flags & 512) result.media = this.predicate();
if (result.flags & 64) result.reply_markup = this.predicate();
if (result.flags & 128) result.entities = this.vector(this.predicate);
if (result.flags & 1024) result.views = this.int();
if (result.flags & 1024) result.forwards = this.int();
if (result.flags & 8388608) result.replies = this.predicate();
if (result.flags & 32768) result.edit_date = this.int();
if (result.flags & 65536) result.post_author = this.string();
if (result.flags & 131072) result.grouped_id = this.long();
if (result.flags & 1048576) result.reactions = this.predicate();
if (result.flags & 4194304) result.restriction_reason = this.vector(this.predicate);
if (result.flags & 33554432) result.ttl_period = this.int();
return result;
  }],
  [721967202, function() {
const result = { _: 'messageService' };
result.flags = this.int();
result.out = !!(result.flags & 2);
result.mentioned = !!(result.flags & 16);
result.media_unread = !!(result.flags & 32);
result.silent = !!(result.flags & 8192);
result.post = !!(result.flags & 16384);
result.legacy = !!(result.flags & 524288);
result.id = this.int();
if (result.flags & 256) result.from_id = this.predicate();
result.peer_id = this.predicate();
if (result.flags & 8) result.reply_to = this.predicate();
result.date = this.int();
result.action = this.predicate();
if (result.flags & 33554432) result.ttl_period = this.int();
return result;
  }],
  [1038967584, function() {
const result = { _: 'messageMediaEmpty' };
return result;
  }],
  [1766936791, function() {
const result = { _: 'messageMediaPhoto' };
result.flags = this.int();
result.spoiler = !!(result.flags & 8);
if (result.flags & 1) result.photo = this.predicate();
if (result.flags & 4) result.ttl_seconds = this.int();
return result;
  }],
  [1457575028, function() {
const result = { _: 'messageMediaGeo' };
result.geo = this.predicate();
return result;
  }],
  [1882335561, function() {
const result = { _: 'messageMediaContact' };
result.phone_number = this.string();
result.first_name = this.string();
result.last_name = this.string();
result.vcard = this.string();
result.user_id = this.long();
return result;
  }],
  [2676290718, function() {
const result = { _: 'messageMediaUnsupported' };
return result;
  }],
  [3064919984, function() {
const result = { _: 'messageActionEmpty' };
return result;
  }],
  [3175599021, function() {
const result = { _: 'messageActionChatCreate' };
result.title = this.string();
result.users = this.vector(this.long, false);
return result;
  }],
  [3047280218, function() {
const result = { _: 'messageActionChatEditTitle' };
result.title = this.string();
return result;
  }],
  [2144015272, function() {
const result = { _: 'messageActionChatEditPhoto' };
result.photo = this.predicate();
return result;
  }],
  [2514746351, function() {
const result = { _: 'messageActionChatDeletePhoto' };
return result;
  }],
  [365886720, function() {
const result = { _: 'messageActionChatAddUser' };
result.users = this.vector(this.long, false);
return result;
  }],
  [2755604684, function() {
const result = { _: 'messageActionChatDeleteUser' };
result.user_id = this.long();
return result;
  }],
  [3582593222, function() {
const result = { _: 'dialog' };
result.flags = this.int();
result.pinned = !!(result.flags & 4);
result.unread_mark = !!(result.flags & 8);
result.view_forum_as_messages = !!(result.flags & 64);
result.peer = this.predicate();
result.top_message = this.int();
result.read_inbox_max_id = this.int();
result.read_outbox_max_id = this.int();
result.unread_count = this.int();
result.unread_mentions_count = this.int();
result.unread_reactions_count = this.int();
result.notify_settings = this.predicate();
if (result.flags & 1) result.pts = this.int();
if (result.flags & 2) result.draft = this.predicate();
if (result.flags & 16) result.folder_id = this.int();
if (result.flags & 32) result.ttl_period = this.int();
return result;
  }],
  [590459437, function() {
const result = { _: 'photoEmpty' };
result.id = this.long();
return result;
  }],
  [4212750949, function() {
const result = { _: 'photo' };
result.flags = this.int();
result.has_stickers = !!(result.flags & 1);
result.id = this.long();
result.access_hash = this.long();
result.file_reference = this.bytes();
result.date = this.int();
result.sizes = this.vector(this.predicate, false);
if (result.flags & 2) result.video_sizes = this.vector(this.predicate);
result.dc_id = this.int();
return result;
  }],
  [236446268, function() {
const result = { _: 'photoSizeEmpty' };
result.type = this.string();
return result;
  }],
  [1976012384, function() {
const result = { _: 'photoSize' };
result.type = this.string();
result.w = this.int();
result.h = this.int();
result.size = this.int();
return result;
  }],
  [35527382, function() {
const result = { _: 'photoCachedSize' };
result.type = this.string();
result.w = this.int();
result.h = this.int();
result.bytes = this.bytes();
return result;
  }],
  [286776671, function() {
const result = { _: 'geoPointEmpty' };
return result;
  }],
  [2997024355, function() {
const result = { _: 'geoPoint' };
result.flags = this.int();
result.long = this.double();
result.lat = this.double();
result.access_hash = this.long();
if (result.flags & 1) result.accuracy_radius = this.int();
return result;
  }],
  [1577067778, function() {
const result = { _: 'auth.sentCode' };
result.flags = this.int();
result.type = this.predicate();
result.phone_code_hash = this.string();
if (result.flags & 2) result.next_type = this.predicate();
if (result.flags & 4) result.timeout = this.int();
return result;
  }],
  [782418132, function() {
const result = { _: 'auth.authorization' };
result.flags = this.int();
result.setup_password_required = !!(result.flags & 2);
if (result.flags & 2) result.otherwise_relogin_days = this.int();
if (result.flags & 1) result.tmp_sessions = this.int();
if (result.flags & 4) result.future_auth_token = this.bytes();
result.user = this.predicate();
return result;
  }],
  [3023364792, function() {
const result = { _: 'auth.exportedAuthorization' };
result.id = this.long();
result.bytes = this.bytes();
return result;
  }],
  [3099351820, function() {
const result = { _: 'inputNotifyPeer' };
result.peer = this.predicate();
return result;
  }],
  [423314455, function() {
const result = { _: 'inputNotifyUsers' };
return result;
  }],
  [1251338318, function() {
const result = { _: 'inputNotifyChats' };
return result;
  }],
  [3402328802, function() {
const result = { _: 'inputPeerNotifySettings' };
result.flags = this.int();
if (result.flags & 1) result.show_previews = this.predicate();
if (result.flags & 2) result.silent = this.predicate();
if (result.flags & 4) result.mute_until = this.int();
if (result.flags & 8) result.sound = this.predicate();
if (result.flags & 64) result.stories_muted = this.predicate();
if (result.flags & 128) result.stories_hide_sender = this.predicate();
if (result.flags & 256) result.stories_sound = this.predicate();
return result;
  }],
  [2573347852, function() {
const result = { _: 'peerNotifySettings' };
result.flags = this.int();
if (result.flags & 1) result.show_previews = this.predicate();
if (result.flags & 2) result.silent = this.predicate();
if (result.flags & 4) result.mute_until = this.int();
if (result.flags & 8) result.ios_sound = this.predicate();
if (result.flags & 16) result.android_sound = this.predicate();
if (result.flags & 32) result.other_sound = this.predicate();
if (result.flags & 64) result.stories_muted = this.predicate();
if (result.flags & 128) result.stories_hide_sender = this.predicate();
if (result.flags & 256) result.stories_ios_sound = this.predicate();
if (result.flags & 512) result.stories_android_sound = this.predicate();
if (result.flags & 1024) result.stories_other_sound = this.predicate();
return result;
  }],
  [2769817869, function() {
const result = { _: 'peerSettings' };
result.flags = this.int();
result.report_spam = !!(result.flags & 1);
result.add_contact = !!(result.flags & 2);
result.block_contact = !!(result.flags & 4);
result.share_contact = !!(result.flags & 8);
result.need_contacts_exception = !!(result.flags & 16);
result.report_geo = !!(result.flags & 32);
result.autoarchived = !!(result.flags & 128);
result.invite_members = !!(result.flags & 256);
result.request_chat_broadcast = !!(result.flags & 1024);
if (result.flags & 64) result.geo_distance = this.int();
if (result.flags & 512) result.request_chat_title = this.string();
if (result.flags & 512) result.request_chat_date = this.int();
return result;
  }],
  [2755118061, function() {
const result = { _: 'wallPaper' };
result.id = this.long();
result.flags = this.int();
result.creator = !!(result.flags & 1);
result.default = !!(result.flags & 2);
result.pattern = !!(result.flags & 8);
result.dark = !!(result.flags & 16);
result.access_hash = this.long();
result.slug = this.string();
result.document = this.predicate();
if (result.flags & 4) result.settings = this.predicate();
return result;
  }],
  [1490799288, function() {
const result = { _: 'inputReportReasonSpam' };
return result;
  }],
  [505595789, function() {
const result = { _: 'inputReportReasonViolence' };
return result;
  }],
  [777640226, function() {
const result = { _: 'inputReportReasonPornography' };
return result;
  }],
  [2918469347, function() {
const result = { _: 'inputReportReasonChildAbuse' };
return result;
  }],
  [3252986545, function() {
const result = { _: 'inputReportReasonOther' };
return result;
  }],
  [3115396204, function() {
const result = { _: 'userFull' };
result.flags = this.int();
result.blocked = !!(result.flags & 1);
result.phone_calls_available = !!(result.flags & 16);
result.phone_calls_private = !!(result.flags & 32);
result.can_pin_message = !!(result.flags & 128);
result.has_scheduled = !!(result.flags & 4096);
result.video_calls_available = !!(result.flags & 8192);
result.voice_messages_forbidden = !!(result.flags & 1048576);
result.translations_disabled = !!(result.flags & 8388608);
result.stories_pinned_available = !!(result.flags & 67108864);
result.blocked_my_stories_from = !!(result.flags & 134217728);
result.wallpaper_overridden = !!(result.flags & 268435456);
result.id = this.long();
if (result.flags & 2) result.about = this.string();
result.settings = this.predicate();
if (result.flags & 2097152) result.personal_photo = this.predicate();
if (result.flags & 4) result.profile_photo = this.predicate();
if (result.flags & 4194304) result.fallback_photo = this.predicate();
result.notify_settings = this.predicate();
if (result.flags & 8) result.bot_info = this.predicate();
if (result.flags & 64) result.pinned_msg_id = this.int();
result.common_chats_count = this.int();
if (result.flags & 2048) result.folder_id = this.int();
if (result.flags & 16384) result.ttl_period = this.int();
if (result.flags & 32768) result.theme_emoticon = this.string();
if (result.flags & 65536) result.private_forward_name = this.string();
if (result.flags & 131072) result.bot_group_admin_rights = this.predicate();
if (result.flags & 262144) result.bot_broadcast_admin_rights = this.predicate();
if (result.flags & 524288) result.premium_gifts = this.vector(this.predicate);
if (result.flags & 16777216) result.wallpaper = this.predicate();
if (result.flags & 33554432) result.stories = this.predicate();
return result;
  }],
  [341499403, function() {
const result = { _: 'contact' };
result.user_id = this.long();
result.mutual = this.predicate();
return result;
  }],
  [3242081360, function() {
const result = { _: 'importedContact' };
result.user_id = this.long();
result.client_id = this.long();
return result;
  }],
  [383348795, function() {
const result = { _: 'contactStatus' };
result.user_id = this.long();
result.status = this.predicate();
return result;
  }],
  [3075189202, function() {
const result = { _: 'contacts.contactsNotModified' };
return result;
  }],
  [3941105218, function() {
const result = { _: 'contacts.contacts' };
result.contacts = this.vector(this.predicate, false);
result.saved_count = this.int();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2010127419, function() {
const result = { _: 'contacts.importedContacts' };
result.imported = this.vector(this.predicate, false);
result.popular_invites = this.vector(this.predicate, false);
result.retry_contacts = this.vector(this.long, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [182326673, function() {
const result = { _: 'contacts.blocked' };
result.blocked = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3781575060, function() {
const result = { _: 'contacts.blockedSlice' };
result.count = this.int();
result.blocked = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [364538944, function() {
const result = { _: 'messages.dialogs' };
result.dialogs = this.vector(this.predicate, false);
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1910543603, function() {
const result = { _: 'messages.dialogsSlice' };
result.count = this.int();
result.dialogs = this.vector(this.predicate, false);
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2356252295, function() {
const result = { _: 'messages.messages' };
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [978610270, function() {
const result = { _: 'messages.messagesSlice' };
result.flags = this.int();
result.inexact = !!(result.flags & 2);
result.count = this.int();
if (result.flags & 1) result.next_rate = this.int();
if (result.flags & 4) result.offset_id_offset = this.int();
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1694474197, function() {
const result = { _: 'messages.chats' };
result.chats = this.vector(this.predicate, false);
return result;
  }],
  [3856126364, function() {
const result = { _: 'messages.chatFull' };
result.full_chat = this.predicate();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3025955281, function() {
const result = { _: 'messages.affectedHistory' };
result.pts = this.int();
result.pts_count = this.int();
result.offset = this.int();
return result;
  }],
  [1474492012, function() {
const result = { _: 'inputMessagesFilterEmpty' };
return result;
  }],
  [2517214492, function() {
const result = { _: 'inputMessagesFilterPhotos' };
return result;
  }],
  [2680163941, function() {
const result = { _: 'inputMessagesFilterVideo' };
return result;
  }],
  [1458172132, function() {
const result = { _: 'inputMessagesFilterPhotoVideo' };
return result;
  }],
  [2665345416, function() {
const result = { _: 'inputMessagesFilterDocument' };
return result;
  }],
  [2129714567, function() {
const result = { _: 'inputMessagesFilterUrl' };
return result;
  }],
  [4291323271, function() {
const result = { _: 'inputMessagesFilterGif' };
return result;
  }],
  [522914557, function() {
const result = { _: 'updateNewMessage' };
result.message = this.predicate();
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [1318109142, function() {
const result = { _: 'updateMessageID' };
result.id = this.int();
result.random_id = this.long();
return result;
  }],
  [2718806245, function() {
const result = { _: 'updateDeleteMessages' };
result.messages = this.vector(this.int, false);
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [3223225727, function() {
const result = { _: 'updateUserTyping' };
result.user_id = this.long();
result.action = this.predicate();
return result;
  }],
  [2202565360, function() {
const result = { _: 'updateChatUserTyping' };
result.chat_id = this.long();
result.from_id = this.predicate();
result.action = this.predicate();
return result;
  }],
  [125178264, function() {
const result = { _: 'updateChatParticipants' };
result.participants = this.predicate();
return result;
  }],
  [3854432478, function() {
const result = { _: 'updateUserStatus' };
result.user_id = this.long();
result.status = this.predicate();
return result;
  }],
  [2810480932, function() {
const result = { _: 'updateUserName' };
result.user_id = this.long();
result.first_name = this.string();
result.last_name = this.string();
result.usernames = this.vector(this.predicate, false);
return result;
  }],
  [2303831023, function() {
const result = { _: 'updateNewAuthorization' };
result.flags = this.int();
result.unconfirmed = !!(result.flags & 1);
result.hash = this.long();
if (result.flags & 1) result.date = this.int();
if (result.flags & 1) result.device = this.string();
if (result.flags & 1) result.location = this.string();
return result;
  }],
  [2775329342, function() {
const result = { _: 'updates.state' };
result.pts = this.int();
result.qts = this.int();
result.date = this.int();
result.seq = this.int();
result.unread_count = this.int();
return result;
  }],
  [1567990072, function() {
const result = { _: 'updates.differenceEmpty' };
result.date = this.int();
result.seq = this.int();
return result;
  }],
  [16030880, function() {
const result = { _: 'updates.difference' };
result.new_messages = this.vector(this.predicate, false);
result.new_encrypted_messages = this.vector(this.predicate, false);
result.other_updates = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
result.state = this.predicate();
return result;
  }],
  [2835028353, function() {
const result = { _: 'updates.differenceSlice' };
result.new_messages = this.vector(this.predicate, false);
result.new_encrypted_messages = this.vector(this.predicate, false);
result.other_updates = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
result.intermediate_state = this.predicate();
return result;
  }],
  [3809980286, function() {
const result = { _: 'updatesTooLong' };
return result;
  }],
  [826001400, function() {
const result = { _: 'updateShortMessage' };
result.flags = this.int();
result.out = !!(result.flags & 2);
result.mentioned = !!(result.flags & 16);
result.media_unread = !!(result.flags & 32);
result.silent = !!(result.flags & 8192);
result.id = this.int();
result.user_id = this.long();
result.message = this.string();
result.pts = this.int();
result.pts_count = this.int();
result.date = this.int();
if (result.flags & 4) result.fwd_from = this.predicate();
if (result.flags & 2048) result.via_bot_id = this.long();
if (result.flags & 8) result.reply_to = this.predicate();
if (result.flags & 128) result.entities = this.vector(this.predicate);
if (result.flags & 33554432) result.ttl_period = this.int();
return result;
  }],
  [1299050149, function() {
const result = { _: 'updateShortChatMessage' };
result.flags = this.int();
result.out = !!(result.flags & 2);
result.mentioned = !!(result.flags & 16);
result.media_unread = !!(result.flags & 32);
result.silent = !!(result.flags & 8192);
result.id = this.int();
result.from_id = this.long();
result.chat_id = this.long();
result.message = this.string();
result.pts = this.int();
result.pts_count = this.int();
result.date = this.int();
if (result.flags & 4) result.fwd_from = this.predicate();
if (result.flags & 2048) result.via_bot_id = this.long();
if (result.flags & 8) result.reply_to = this.predicate();
if (result.flags & 128) result.entities = this.vector(this.predicate);
if (result.flags & 33554432) result.ttl_period = this.int();
return result;
  }],
  [2027216577, function() {
const result = { _: 'updateShort' };
result.update = this.predicate();
result.date = this.int();
return result;
  }],
  [1918567619, function() {
const result = { _: 'updatesCombined' };
result.updates = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.date = this.int();
result.seq_start = this.int();
result.seq = this.int();
return result;
  }],
  [1957577280, function() {
const result = { _: 'updates' };
result.updates = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.date = this.int();
result.seq = this.int();
return result;
  }],
  [2378853029, function() {
const result = { _: 'photos.photos' };
result.photos = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [352657236, function() {
const result = { _: 'photos.photosSlice' };
result.count = this.int();
result.photos = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [539045032, function() {
const result = { _: 'photos.photo' };
result.photo = this.predicate();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [157948117, function() {
const result = { _: 'upload.file' };
result.type = this.predicate();
result.mtime = this.int();
result.bytes = this.bytes();
return result;
  }],
  [414687501, function() {
const result = { _: 'dcOption' };
result.flags = this.int();
result.ipv6 = !!(result.flags & 1);
result.media_only = !!(result.flags & 2);
result.tcpo_only = !!(result.flags & 4);
result.cdn = !!(result.flags & 8);
result.static = !!(result.flags & 16);
result.this_port_only = !!(result.flags & 32);
result.id = this.int();
result.ip_address = this.string();
result.port = this.int();
if (result.flags & 1024) result.secret = this.bytes();
return result;
  }],
  [3424265246, function() {
const result = { _: 'config' };
result.flags = this.int();
result.default_p2p_contacts = !!(result.flags & 8);
result.preload_featured_stickers = !!(result.flags & 16);
result.revoke_pm_inbox = !!(result.flags & 64);
result.blocked_mode = !!(result.flags & 256);
result.force_try_ipv6 = !!(result.flags & 16384);
result.date = this.int();
result.expires = this.int();
result.test_mode = this.predicate();
result.this_dc = this.int();
result.dc_options = this.vector(this.predicate, false);
result.dc_txt_domain_name = this.string();
result.chat_size_max = this.int();
result.megagroup_size_max = this.int();
result.forwarded_count_max = this.int();
result.online_update_period_ms = this.int();
result.offline_blur_timeout_ms = this.int();
result.offline_idle_timeout_ms = this.int();
result.online_cloud_timeout_ms = this.int();
result.notify_cloud_delay_ms = this.int();
result.notify_default_delay_ms = this.int();
result.push_chat_period_ms = this.int();
result.push_chat_limit = this.int();
result.edit_time_limit = this.int();
result.revoke_time_limit = this.int();
result.revoke_pm_time_limit = this.int();
result.rating_e_decay = this.int();
result.stickers_recent_limit = this.int();
result.channels_read_media_period = this.int();
if (result.flags & 1) result.tmp_sessions = this.int();
result.call_receive_timeout_ms = this.int();
result.call_ring_timeout_ms = this.int();
result.call_connect_timeout_ms = this.int();
result.call_packet_timeout_ms = this.int();
result.me_url_prefix = this.string();
if (result.flags & 128) result.autoupdate_url_prefix = this.string();
if (result.flags & 512) result.gif_search_username = this.string();
if (result.flags & 1024) result.venue_search_username = this.string();
if (result.flags & 2048) result.img_search_username = this.string();
if (result.flags & 4096) result.static_maps_provider = this.string();
result.caption_length_max = this.int();
result.message_length_max = this.int();
result.webfile_dc_id = this.int();
if (result.flags & 4) result.suggested_lang_code = this.string();
if (result.flags & 4) result.lang_pack_version = this.int();
if (result.flags & 4) result.base_lang_pack_version = this.int();
if (result.flags & 32768) result.reactions_default = this.predicate();
if (result.flags & 65536) result.autologin_token = this.string();
return result;
  }],
  [2384074613, function() {
const result = { _: 'nearestDc' };
result.country = this.string();
result.this_dc = this.int();
result.nearest_dc = this.int();
return result;
  }],
  [3434860080, function() {
const result = { _: 'help.appUpdate' };
result.flags = this.int();
result.can_not_skip = !!(result.flags & 1);
result.id = this.int();
result.version = this.string();
result.text = this.string();
result.entities = this.vector(this.predicate, false);
if (result.flags & 2) result.document = this.predicate();
if (result.flags & 4) result.url = this.string();
if (result.flags & 8) result.sticker = this.predicate();
return result;
  }],
  [3294258486, function() {
const result = { _: 'help.noAppUpdate' };
return result;
  }],
  [415997816, function() {
const result = { _: 'help.inviteText' };
result.message = this.string();
return result;
  }],
  [314359194, function() {
const result = { _: 'updateNewEncryptedMessage' };
result.message = this.predicate();
result.qts = this.int();
return result;
  }],
  [386986326, function() {
const result = { _: 'updateEncryptedChatTyping' };
result.chat_id = this.int();
return result;
  }],
  [3030575245, function() {
const result = { _: 'updateEncryption' };
result.chat = this.predicate();
result.date = this.int();
return result;
  }],
  [956179895, function() {
const result = { _: 'updateEncryptedMessagesRead' };
result.chat_id = this.int();
result.max_date = this.int();
result.date = this.int();
return result;
  }],
  [2877210784, function() {
const result = { _: 'encryptedChatEmpty' };
result.id = this.int();
return result;
  }],
  [1722964307, function() {
const result = { _: 'encryptedChatWaiting' };
result.id = this.int();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.long();
result.participant_id = this.long();
return result;
  }],
  [1223809356, function() {
const result = { _: 'encryptedChatRequested' };
result.flags = this.int();
if (result.flags & 1) result.folder_id = this.int();
result.id = this.int();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.long();
result.participant_id = this.long();
result.g_a = this.bytes();
return result;
  }],
  [1643173063, function() {
const result = { _: 'encryptedChat' };
result.id = this.int();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.long();
result.participant_id = this.long();
result.g_a_or_b = this.bytes();
result.key_fingerprint = this.long();
return result;
  }],
  [505183301, function() {
const result = { _: 'encryptedChatDiscarded' };
result.flags = this.int();
result.history_deleted = !!(result.flags & 1);
result.id = this.int();
return result;
  }],
  [4047615457, function() {
const result = { _: 'inputEncryptedChat' };
result.chat_id = this.int();
result.access_hash = this.long();
return result;
  }],
  [3256830334, function() {
const result = { _: 'encryptedFileEmpty' };
return result;
  }],
  [2818608344, function() {
const result = { _: 'encryptedFile' };
result.id = this.long();
result.access_hash = this.long();
result.size = this.long();
result.dc_id = this.int();
result.key_fingerprint = this.int();
return result;
  }],
  [406307684, function() {
const result = { _: 'inputEncryptedFileEmpty' };
return result;
  }],
  [1690108678, function() {
const result = { _: 'inputEncryptedFileUploaded' };
result.id = this.long();
result.parts = this.int();
result.md5_checksum = this.string();
result.key_fingerprint = this.int();
return result;
  }],
  [1511503333, function() {
const result = { _: 'inputEncryptedFile' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [4112735573, function() {
const result = { _: 'inputEncryptedFileLocation' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [3977822488, function() {
const result = { _: 'encryptedMessage' };
result.random_id = this.long();
result.chat_id = this.int();
result.date = this.int();
result.bytes = this.bytes();
result.file = this.predicate();
return result;
  }],
  [594758406, function() {
const result = { _: 'encryptedMessageService' };
result.random_id = this.long();
result.chat_id = this.int();
result.date = this.int();
result.bytes = this.bytes();
return result;
  }],
  [3236054581, function() {
const result = { _: 'messages.dhConfigNotModified' };
result.random = this.bytes();
return result;
  }],
  [740433629, function() {
const result = { _: 'messages.dhConfig' };
result.g = this.int();
result.p = this.bytes();
result.version = this.int();
result.random = this.bytes();
return result;
  }],
  [1443858741, function() {
const result = { _: 'messages.sentEncryptedMessage' };
result.date = this.int();
return result;
  }],
  [2492727090, function() {
const result = { _: 'messages.sentEncryptedFile' };
result.date = this.int();
result.file = this.predicate();
return result;
  }],
  [4199484341, function() {
const result = { _: 'inputFileBig' };
result.id = this.long();
result.parts = this.int();
result.name = this.string();
return result;
  }],
  [767652808, function() {
const result = { _: 'inputEncryptedFileBigUploaded' };
result.id = this.long();
result.parts = this.int();
result.key_fingerprint = this.int();
return result;
  }],
  [1037718609, function() {
const result = { _: 'updateChatParticipantAdd' };
result.chat_id = this.long();
result.user_id = this.long();
result.inviter_id = this.long();
result.date = this.int();
result.version = this.int();
return result;
  }],
  [3811523959, function() {
const result = { _: 'updateChatParticipantDelete' };
result.chat_id = this.long();
result.user_id = this.long();
result.version = this.int();
return result;
  }],
  [2388564083, function() {
const result = { _: 'updateDcOptions' };
result.dc_options = this.vector(this.predicate, false);
return result;
  }],
  [1530447553, function() {
const result = { _: 'inputMediaUploadedDocument' };
result.flags = this.int();
result.nosound_video = !!(result.flags & 8);
result.force_file = !!(result.flags & 16);
result.spoiler = !!(result.flags & 32);
result.file = this.predicate();
if (result.flags & 4) result.thumb = this.predicate();
result.mime_type = this.string();
result.attributes = this.vector(this.predicate, false);
if (result.flags & 1) result.stickers = this.vector(this.predicate);
if (result.flags & 2) result.ttl_seconds = this.int();
return result;
  }],
  [860303448, function() {
const result = { _: 'inputMediaDocument' };
result.flags = this.int();
result.spoiler = !!(result.flags & 4);
result.id = this.predicate();
if (result.flags & 1) result.ttl_seconds = this.int();
if (result.flags & 2) result.query = this.string();
return result;
  }],
  [1291114285, function() {
const result = { _: 'messageMediaDocument' };
result.flags = this.int();
result.nopremium = !!(result.flags & 8);
result.spoiler = !!(result.flags & 16);
result.video = !!(result.flags & 64);
result.round = !!(result.flags & 128);
result.voice = !!(result.flags & 256);
if (result.flags & 1) result.document = this.predicate();
if (result.flags & 32) result.alt_document = this.predicate();
if (result.flags & 4) result.ttl_seconds = this.int();
return result;
  }],
  [1928391342, function() {
const result = { _: 'inputDocumentEmpty' };
return result;
  }],
  [448771445, function() {
const result = { _: 'inputDocument' };
result.id = this.long();
result.access_hash = this.long();
result.file_reference = this.bytes();
return result;
  }],
  [3134223748, function() {
const result = { _: 'inputDocumentFileLocation' };
result.id = this.long();
result.access_hash = this.long();
result.file_reference = this.bytes();
result.thumb_size = this.string();
return result;
  }],
  [922273905, function() {
const result = { _: 'documentEmpty' };
result.id = this.long();
return result;
  }],
  [2413085912, function() {
const result = { _: 'document' };
result.flags = this.int();
result.id = this.long();
result.access_hash = this.long();
result.file_reference = this.bytes();
result.date = this.int();
result.mime_type = this.string();
result.size = this.long();
if (result.flags & 1) result.thumbs = this.vector(this.predicate);
if (result.flags & 2) result.video_thumbs = this.vector(this.predicate);
result.dc_id = this.int();
result.attributes = this.vector(this.predicate, false);
return result;
  }],
  [398898678, function() {
const result = { _: 'help.support' };
result.phone_number = this.string();
result.user = this.predicate();
return result;
  }],
  [2681474008, function() {
const result = { _: 'notifyPeer' };
result.peer = this.predicate();
return result;
  }],
  [3033021260, function() {
const result = { _: 'notifyUsers' };
return result;
  }],
  [3221737155, function() {
const result = { _: 'notifyChats' };
return result;
  }],
  [3200411887, function() {
const result = { _: 'updateNotifySettings' };
result.peer = this.predicate();
result.notify_settings = this.predicate();
return result;
  }],
  [381645902, function() {
const result = { _: 'sendMessageTypingAction' };
return result;
  }],
  [4250847477, function() {
const result = { _: 'sendMessageCancelAction' };
return result;
  }],
  [2710034031, function() {
const result = { _: 'sendMessageRecordVideoAction' };
return result;
  }],
  [3916839660, function() {
const result = { _: 'sendMessageUploadVideoAction' };
result.progress = this.int();
return result;
  }],
  [3576656887, function() {
const result = { _: 'sendMessageRecordAudioAction' };
return result;
  }],
  [4082227115, function() {
const result = { _: 'sendMessageUploadAudioAction' };
result.progress = this.int();
return result;
  }],
  [3520285222, function() {
const result = { _: 'sendMessageUploadPhotoAction' };
result.progress = this.int();
return result;
  }],
  [2852968932, function() {
const result = { _: 'sendMessageUploadDocumentAction' };
result.progress = this.int();
return result;
  }],
  [393186209, function() {
const result = { _: 'sendMessageGeoLocationAction' };
return result;
  }],
  [1653390447, function() {
const result = { _: 'sendMessageChooseContactAction' };
return result;
  }],
  [3004386717, function() {
const result = { _: 'contacts.found' };
result.my_results = this.vector(this.predicate, false);
result.results = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3957614617, function() {
const result = { _: 'updateServiceNotification' };
result.flags = this.int();
result.popup = !!(result.flags & 1);
result.invert_media = !!(result.flags & 4);
if (result.flags & 2) result.inbox_date = this.int();
result.type = this.string();
result.message = this.string();
result.media = this.predicate();
result.entities = this.vector(this.predicate, false);
return result;
  }],
  [3798942449, function() {
const result = { _: 'userStatusRecently' };
return result;
  }],
  [129960444, function() {
const result = { _: 'userStatusLastWeek' };
return result;
  }],
  [2011940674, function() {
const result = { _: 'userStatusLastMonth' };
return result;
  }],
  [3996854058, function() {
const result = { _: 'updatePrivacy' };
result.key = this.predicate();
result.rules = this.vector(this.predicate, false);
return result;
  }],
  [1335282456, function() {
const result = { _: 'inputPrivacyKeyStatusTimestamp' };
return result;
  }],
  [3157175088, function() {
const result = { _: 'privacyKeyStatusTimestamp' };
return result;
  }],
  [218751099, function() {
const result = { _: 'inputPrivacyValueAllowContacts' };
return result;
  }],
  [407582158, function() {
const result = { _: 'inputPrivacyValueAllowAll' };
return result;
  }],
  [320652927, function() {
const result = { _: 'inputPrivacyValueAllowUsers' };
result.users = this.vector(this.predicate, false);
return result;
  }],
  [195371015, function() {
const result = { _: 'inputPrivacyValueDisallowContacts' };
return result;
  }],
  [3597362889, function() {
const result = { _: 'inputPrivacyValueDisallowAll' };
return result;
  }],
  [2417034343, function() {
const result = { _: 'inputPrivacyValueDisallowUsers' };
result.users = this.vector(this.predicate, false);
return result;
  }],
  [4294843308, function() {
const result = { _: 'privacyValueAllowContacts' };
return result;
  }],
  [1698855810, function() {
const result = { _: 'privacyValueAllowAll' };
return result;
  }],
  [3096469426, function() {
const result = { _: 'privacyValueAllowUsers' };
result.users = this.vector(this.long, false);
return result;
  }],
  [4169726490, function() {
const result = { _: 'privacyValueDisallowContacts' };
return result;
  }],
  [2339628899, function() {
const result = { _: 'privacyValueDisallowAll' };
return result;
  }],
  [3831632193, function() {
const result = { _: 'privacyValueDisallowUsers' };
result.users = this.vector(this.long, false);
return result;
  }],
  [1352683077, function() {
const result = { _: 'account.privacyRules' };
result.rules = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3100684255, function() {
const result = { _: 'accountDaysTTL' };
result.days = this.int();
return result;
  }],
  [88680979, function() {
const result = { _: 'updateUserPhone' };
result.user_id = this.long();
result.phone = this.string();
return result;
  }],
  [1815593308, function() {
const result = { _: 'documentAttributeImageSize' };
result.w = this.int();
result.h = this.int();
return result;
  }],
  [297109817, function() {
const result = { _: 'documentAttributeAnimated' };
return result;
  }],
  [1662637586, function() {
const result = { _: 'documentAttributeSticker' };
result.flags = this.int();
result.mask = !!(result.flags & 2);
result.alt = this.string();
result.stickerset = this.predicate();
if (result.flags & 1) result.mask_coords = this.predicate();
return result;
  }],
  [3549426114, function() {
const result = { _: 'documentAttributeVideo' };
result.flags = this.int();
result.round_message = !!(result.flags & 1);
result.supports_streaming = !!(result.flags & 2);
result.nosound = !!(result.flags & 8);
result.duration = this.double();
result.w = this.int();
result.h = this.int();
if (result.flags & 4) result.preload_prefix_size = this.int();
return result;
  }],
  [2555574726, function() {
const result = { _: 'documentAttributeAudio' };
result.flags = this.int();
result.voice = !!(result.flags & 1024);
result.duration = this.int();
if (result.flags & 1) result.title = this.string();
if (result.flags & 2) result.performer = this.string();
if (result.flags & 4) result.waveform = this.bytes();
return result;
  }],
  [358154344, function() {
const result = { _: 'documentAttributeFilename' };
result.file_name = this.string();
return result;
  }],
  [4050950690, function() {
const result = { _: 'messages.stickersNotModified' };
return result;
  }],
  [816245886, function() {
const result = { _: 'messages.stickers' };
result.hash = this.long();
result.stickers = this.vector(this.predicate, false);
return result;
  }],
  [313694676, function() {
const result = { _: 'stickerPack' };
result.emoticon = this.string();
result.documents = this.vector(this.long, false);
return result;
  }],
  [3898999491, function() {
const result = { _: 'messages.allStickersNotModified' };
return result;
  }],
  [3451637435, function() {
const result = { _: 'messages.allStickers' };
result.hash = this.long();
result.sets = this.vector(this.predicate, false);
return result;
  }],
  [2627162079, function() {
const result = { _: 'updateReadHistoryInbox' };
result.flags = this.int();
if (result.flags & 1) result.folder_id = this.int();
result.peer = this.predicate();
result.max_id = this.int();
result.still_unread_count = this.int();
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [791617983, function() {
const result = { _: 'updateReadHistoryOutbox' };
result.peer = this.predicate();
result.max_id = this.int();
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [2228326789, function() {
const result = { _: 'messages.affectedMessages' };
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [2139689491, function() {
const result = { _: 'updateWebPage' };
result.webpage = this.predicate();
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [555358088, function() {
const result = { _: 'webPageEmpty' };
result.flags = this.int();
result.id = this.long();
if (result.flags & 1) result.url = this.string();
return result;
  }],
  [2966502983, function() {
const result = { _: 'webPagePending' };
result.flags = this.int();
result.id = this.long();
if (result.flags & 1) result.url = this.string();
result.date = this.int();
return result;
  }],
  [3902555570, function() {
const result = { _: 'webPage' };
result.flags = this.int();
result.has_large_media = !!(result.flags & 8192);
result.id = this.long();
result.url = this.string();
result.display_url = this.string();
result.hash = this.int();
if (result.flags & 1) result.type = this.string();
if (result.flags & 2) result.site_name = this.string();
if (result.flags & 4) result.title = this.string();
if (result.flags & 8) result.description = this.string();
if (result.flags & 16) result.photo = this.predicate();
if (result.flags & 32) result.embed_url = this.string();
if (result.flags & 32) result.embed_type = this.string();
if (result.flags & 64) result.embed_width = this.int();
if (result.flags & 64) result.embed_height = this.int();
if (result.flags & 128) result.duration = this.int();
if (result.flags & 256) result.author = this.string();
if (result.flags & 512) result.document = this.predicate();
if (result.flags & 1024) result.cached_page = this.predicate();
if (result.flags & 4096) result.attributes = this.vector(this.predicate);
return result;
  }],
  [3723562043, function() {
const result = { _: 'messageMediaWebPage' };
result.flags = this.int();
result.force_large_media = !!(result.flags & 1);
result.force_small_media = !!(result.flags & 2);
result.manual = !!(result.flags & 8);
result.safe = !!(result.flags & 16);
result.webpage = this.predicate();
return result;
  }],
  [2902578717, function() {
const result = { _: 'authorization' };
result.flags = this.int();
result.current = !!(result.flags & 1);
result.official_app = !!(result.flags & 2);
result.password_pending = !!(result.flags & 4);
result.encrypted_requests_disabled = !!(result.flags & 8);
result.call_requests_disabled = !!(result.flags & 16);
result.unconfirmed = !!(result.flags & 32);
result.hash = this.long();
result.device_model = this.string();
result.platform = this.string();
result.system_version = this.string();
result.api_id = this.int();
result.app_name = this.string();
result.app_version = this.string();
result.date_created = this.int();
result.date_active = this.int();
result.ip = this.string();
result.country = this.string();
result.region = this.string();
return result;
  }],
  [1275039392, function() {
const result = { _: 'account.authorizations' };
result.authorization_ttl_days = this.int();
result.authorizations = this.vector(this.predicate, false);
return result;
  }],
  [2507886843, function() {
const result = { _: 'account.password' };
result.flags = this.int();
result.has_recovery = !!(result.flags & 1);
result.has_secure_values = !!(result.flags & 2);
result.has_password = !!(result.flags & 4);
if (result.flags & 4) result.current_algo = this.predicate();
if (result.flags & 4) result.srp_B = this.bytes();
if (result.flags & 4) result.srp_id = this.long();
if (result.flags & 8) result.hint = this.string();
if (result.flags & 16) result.email_unconfirmed_pattern = this.string();
result.new_algo = this.predicate();
result.new_secure_algo = this.predicate();
result.secure_random = this.bytes();
if (result.flags & 32) result.pending_reset_date = this.int();
if (result.flags & 64) result.login_email_pattern = this.string();
return result;
  }],
  [2589733861, function() {
const result = { _: 'account.passwordSettings' };
result.flags = this.int();
if (result.flags & 1) result.email = this.string();
if (result.flags & 2) result.secure_settings = this.predicate();
return result;
  }],
  [3258394569, function() {
const result = { _: 'account.passwordInputSettings' };
result.flags = this.int();
if (result.flags & 1) result.new_algo = this.predicate();
if (result.flags & 1) result.new_password_hash = this.bytes();
if (result.flags & 1) result.hint = this.string();
if (result.flags & 2) result.email = this.string();
if (result.flags & 4) result.new_secure_settings = this.predicate();
return result;
  }],
  [326715557, function() {
const result = { _: 'auth.passwordRecovery' };
result.email_pattern = this.string();
return result;
  }],
  [3242007569, function() {
const result = { _: 'inputMediaVenue' };
result.geo_point = this.predicate();
result.title = this.string();
result.address = this.string();
result.provider = this.string();
result.venue_id = this.string();
result.venue_type = this.string();
return result;
  }],
  [784356159, function() {
const result = { _: 'messageMediaVenue' };
result.geo = this.predicate();
result.title = this.string();
result.address = this.string();
result.provider = this.string();
result.venue_id = this.string();
result.venue_type = this.string();
return result;
  }],
  [2743383929, function() {
const result = { _: 'receivedNotifyMessage' };
result.id = this.int();
result.flags = this.int();
return result;
  }],
  [179611673, function() {
const result = { _: 'chatInviteExported' };
result.flags = this.int();
result.revoked = !!(result.flags & 1);
result.permanent = !!(result.flags & 32);
result.request_needed = !!(result.flags & 64);
result.link = this.string();
result.admin_id = this.long();
result.date = this.int();
if (result.flags & 16) result.start_date = this.int();
if (result.flags & 2) result.expire_date = this.int();
if (result.flags & 4) result.usage_limit = this.int();
if (result.flags & 8) result.usage = this.int();
if (result.flags & 128) result.requested = this.int();
if (result.flags & 256) result.title = this.string();
return result;
  }],
  [1516793212, function() {
const result = { _: 'chatInviteAlready' };
result.chat = this.predicate();
return result;
  }],
  [3454069824, function() {
const result = { _: 'chatInvite' };
result.flags = this.int();
result.channel = !!(result.flags & 1);
result.broadcast = !!(result.flags & 2);
result.public = !!(result.flags & 4);
result.megagroup = !!(result.flags & 8);
result.request_needed = !!(result.flags & 64);
result.verified = !!(result.flags & 128);
result.scam = !!(result.flags & 256);
result.fake = !!(result.flags & 512);
result.title = this.string();
if (result.flags & 32) result.about = this.string();
result.photo = this.predicate();
result.participants_count = this.int();
if (result.flags & 16) result.participants = this.vector(this.predicate);
result.color = this.int();
return result;
  }],
  [51520707, function() {
const result = { _: 'messageActionChatJoinedByLink' };
result.inviter_id = this.long();
return result;
  }],
  [4163006849, function() {
const result = { _: 'updateReadMessagesContents' };
result.flags = this.int();
result.messages = this.vector(this.int, false);
result.pts = this.int();
result.pts_count = this.int();
if (result.flags & 1) result.date = this.int();
return result;
  }],
  [4290128789, function() {
const result = { _: 'inputStickerSetEmpty' };
return result;
  }],
  [2649203305, function() {
const result = { _: 'inputStickerSetID' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [2250033312, function() {
const result = { _: 'inputStickerSetShortName' };
result.short_name = this.string();
return result;
  }],
  [768691932, function() {
const result = { _: 'stickerSet' };
result.flags = this.int();
result.archived = !!(result.flags & 2);
result.official = !!(result.flags & 4);
result.masks = !!(result.flags & 8);
result.animated = !!(result.flags & 32);
result.videos = !!(result.flags & 64);
result.emojis = !!(result.flags & 128);
result.text_color = !!(result.flags & 512);
result.channel_emoji_status = !!(result.flags & 1024);
if (result.flags & 1) result.installed_date = this.int();
result.id = this.long();
result.access_hash = this.long();
result.title = this.string();
result.short_name = this.string();
if (result.flags & 16) result.thumbs = this.vector(this.predicate);
if (result.flags & 16) result.thumb_dc_id = this.int();
if (result.flags & 16) result.thumb_version = this.int();
if (result.flags & 256) result.thumb_document_id = this.long();
result.count = this.int();
result.hash = this.int();
return result;
  }],
  [1846886166, function() {
const result = { _: 'messages.stickerSet' };
result.set = this.predicate();
result.packs = this.vector(this.predicate, false);
result.keywords = this.vector(this.predicate, false);
result.documents = this.vector(this.predicate, false);
return result;
  }],
  [559694904, function() {
const result = { _: 'user' };
result.flags = this.int();
result.self = !!(result.flags & 1024);
result.contact = !!(result.flags & 2048);
result.mutual_contact = !!(result.flags & 4096);
result.deleted = !!(result.flags & 8192);
result.bot = !!(result.flags & 16384);
result.bot_chat_history = !!(result.flags & 32768);
result.bot_nochats = !!(result.flags & 65536);
result.verified = !!(result.flags & 131072);
result.restricted = !!(result.flags & 262144);
result.min = !!(result.flags & 1048576);
result.bot_inline_geo = !!(result.flags & 2097152);
result.support = !!(result.flags & 8388608);
result.scam = !!(result.flags & 16777216);
result.apply_min_photo = !!(result.flags & 33554432);
result.fake = !!(result.flags & 67108864);
result.bot_attach_menu = !!(result.flags & 134217728);
result.premium = !!(result.flags & 268435456);
result.attach_menu_enabled = !!(result.flags & 536870912);
result.flags2 = this.int();
result.bot_can_edit = !!(result.flags2 & 2);
result.close_friend = !!(result.flags2 & 4);
result.stories_hidden = !!(result.flags2 & 8);
result.stories_unavailable = !!(result.flags2 & 16);
result.id = this.long();
if (result.flags & 1) result.access_hash = this.long();
if (result.flags & 2) result.first_name = this.string();
if (result.flags & 4) result.last_name = this.string();
if (result.flags & 8) result.username = this.string();
if (result.flags & 16) result.phone = this.string();
if (result.flags & 32) result.photo = this.predicate();
if (result.flags & 64) result.status = this.predicate();
if (result.flags & 16384) result.bot_info_version = this.int();
if (result.flags & 262144) result.restriction_reason = this.vector(this.predicate);
if (result.flags & 524288) result.bot_inline_placeholder = this.string();
if (result.flags & 4194304) result.lang_code = this.string();
if (result.flags & 1073741824) result.emoji_status = this.predicate();
if (result.flags2 & 1) result.usernames = this.vector(this.predicate);
if (result.flags2 & 32) result.stories_max_id = this.int();
if (result.flags2 & 256) result.color = this.predicate();
if (result.flags2 & 512) result.profile_color = this.predicate();
return result;
  }],
  [3262826695, function() {
const result = { _: 'botCommand' };
result.command = this.string();
result.description = this.string();
return result;
  }],
  [2402290519, function() {
const result = { _: 'botInfo' };
result.flags = this.int();
if (result.flags & 1) result.user_id = this.long();
if (result.flags & 2) result.description = this.string();
if (result.flags & 16) result.description_photo = this.predicate();
if (result.flags & 32) result.description_document = this.predicate();
if (result.flags & 4) result.commands = this.vector(this.predicate);
if (result.flags & 8) result.menu_button = this.predicate();
return result;
  }],
  [2734311552, function() {
const result = { _: 'keyboardButton' };
result.text = this.string();
return result;
  }],
  [2002815875, function() {
const result = { _: 'keyboardButtonRow' };
result.buttons = this.vector(this.predicate, false);
return result;
  }],
  [2688441221, function() {
const result = { _: 'replyKeyboardHide' };
result.flags = this.int();
result.selective = !!(result.flags & 4);
return result;
  }],
  [2259946248, function() {
const result = { _: 'replyKeyboardForceReply' };
result.flags = this.int();
result.single_use = !!(result.flags & 2);
result.selective = !!(result.flags & 4);
if (result.flags & 8) result.placeholder = this.string();
return result;
  }],
  [2245892561, function() {
const result = { _: 'replyKeyboardMarkup' };
result.flags = this.int();
result.resize = !!(result.flags & 1);
result.single_use = !!(result.flags & 2);
result.selective = !!(result.flags & 4);
result.persistent = !!(result.flags & 16);
result.rows = this.vector(this.predicate, false);
if (result.flags & 8) result.placeholder = this.string();
return result;
  }],
  [3723011404, function() {
const result = { _: 'inputPeerUser' };
result.user_id = this.long();
result.access_hash = this.long();
return result;
  }],
  [4061223110, function() {
const result = { _: 'inputUser' };
result.user_id = this.long();
result.access_hash = this.long();
return result;
  }],
  [3146955413, function() {
const result = { _: 'messageEntityUnknown' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [4194588573, function() {
const result = { _: 'messageEntityMention' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [1868782349, function() {
const result = { _: 'messageEntityHashtag' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [1827637959, function() {
const result = { _: 'messageEntityBotCommand' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [1859134776, function() {
const result = { _: 'messageEntityUrl' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [1692693954, function() {
const result = { _: 'messageEntityEmail' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [3177253833, function() {
const result = { _: 'messageEntityBold' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [2188348256, function() {
const result = { _: 'messageEntityItalic' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [681706865, function() {
const result = { _: 'messageEntityCode' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [1938967520, function() {
const result = { _: 'messageEntityPre' };
result.offset = this.int();
result.length = this.int();
result.language = this.string();
return result;
  }],
  [1990644519, function() {
const result = { _: 'messageEntityTextUrl' };
result.offset = this.int();
result.length = this.int();
result.url = this.string();
return result;
  }],
  [2417352961, function() {
const result = { _: 'updateShortSentMessage' };
result.flags = this.int();
result.out = !!(result.flags & 2);
result.id = this.int();
result.pts = this.int();
result.pts_count = this.int();
result.date = this.int();
if (result.flags & 512) result.media = this.predicate();
if (result.flags & 128) result.entities = this.vector(this.predicate);
if (result.flags & 33554432) result.ttl_period = this.int();
return result;
  }],
  [4002160262, function() {
const result = { _: 'inputChannelEmpty' };
return result;
  }],
  [4082822184, function() {
const result = { _: 'inputChannel' };
result.channel_id = this.long();
result.access_hash = this.long();
return result;
  }],
  [2728736542, function() {
const result = { _: 'peerChannel' };
result.channel_id = this.long();
return result;
  }],
  [666680316, function() {
const result = { _: 'inputPeerChannel' };
result.channel_id = this.long();
result.access_hash = this.long();
return result;
  }],
  [179174543, function() {
const result = { _: 'channel' };
result.flags = this.int();
result.creator = !!(result.flags & 1);
result.left = !!(result.flags & 4);
result.broadcast = !!(result.flags & 32);
result.verified = !!(result.flags & 128);
result.megagroup = !!(result.flags & 256);
result.restricted = !!(result.flags & 512);
result.signatures = !!(result.flags & 2048);
result.min = !!(result.flags & 4096);
result.scam = !!(result.flags & 524288);
result.has_link = !!(result.flags & 1048576);
result.has_geo = !!(result.flags & 2097152);
result.slowmode_enabled = !!(result.flags & 4194304);
result.call_active = !!(result.flags & 8388608);
result.call_not_empty = !!(result.flags & 16777216);
result.fake = !!(result.flags & 33554432);
result.gigagroup = !!(result.flags & 67108864);
result.noforwards = !!(result.flags & 134217728);
result.join_to_send = !!(result.flags & 268435456);
result.join_request = !!(result.flags & 536870912);
result.forum = !!(result.flags & 1073741824);
result.flags2 = this.int();
result.stories_hidden = !!(result.flags2 & 2);
result.stories_hidden_min = !!(result.flags2 & 4);
result.stories_unavailable = !!(result.flags2 & 8);
result.id = this.long();
if (result.flags & 8192) result.access_hash = this.long();
result.title = this.string();
if (result.flags & 64) result.username = this.string();
result.photo = this.predicate();
result.date = this.int();
if (result.flags & 512) result.restriction_reason = this.vector(this.predicate);
if (result.flags & 16384) result.admin_rights = this.predicate();
if (result.flags & 32768) result.banned_rights = this.predicate();
if (result.flags & 262144) result.default_banned_rights = this.predicate();
if (result.flags & 131072) result.participants_count = this.int();
if (result.flags2 & 1) result.usernames = this.vector(this.predicate);
if (result.flags2 & 16) result.stories_max_id = this.int();
if (result.flags2 & 128) result.color = this.predicate();
if (result.flags2 & 256) result.profile_color = this.predicate();
if (result.flags2 & 512) result.emoji_status = this.predicate();
if (result.flags2 & 1024) result.level = this.int();
return result;
  }],
  [399807445, function() {
const result = { _: 'channelForbidden' };
result.flags = this.int();
result.broadcast = !!(result.flags & 32);
result.megagroup = !!(result.flags & 256);
result.id = this.long();
result.access_hash = this.long();
result.title = this.string();
if (result.flags & 65536) result.until_date = this.int();
return result;
  }],
  [2131196633, function() {
const result = { _: 'contacts.resolvedPeer' };
result.peer = this.predicate();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [254528367, function() {
const result = { _: 'channelFull' };
result.flags = this.int();
result.can_view_participants = !!(result.flags & 8);
result.can_set_username = !!(result.flags & 64);
result.can_set_stickers = !!(result.flags & 128);
result.hidden_prehistory = !!(result.flags & 1024);
result.can_set_location = !!(result.flags & 65536);
result.has_scheduled = !!(result.flags & 524288);
result.can_view_stats = !!(result.flags & 1048576);
result.blocked = !!(result.flags & 4194304);
result.flags2 = this.int();
result.can_delete_channel = !!(result.flags2 & 1);
result.antispam = !!(result.flags2 & 2);
result.participants_hidden = !!(result.flags2 & 4);
result.translations_disabled = !!(result.flags2 & 8);
result.stories_pinned_available = !!(result.flags2 & 32);
result.view_forum_as_messages = !!(result.flags2 & 64);
result.id = this.long();
result.about = this.string();
if (result.flags & 1) result.participants_count = this.int();
if (result.flags & 2) result.admins_count = this.int();
if (result.flags & 4) result.kicked_count = this.int();
if (result.flags & 4) result.banned_count = this.int();
if (result.flags & 8192) result.online_count = this.int();
result.read_inbox_max_id = this.int();
result.read_outbox_max_id = this.int();
result.unread_count = this.int();
result.chat_photo = this.predicate();
result.notify_settings = this.predicate();
if (result.flags & 8388608) result.exported_invite = this.predicate();
result.bot_info = this.vector(this.predicate, false);
if (result.flags & 16) result.migrated_from_chat_id = this.long();
if (result.flags & 16) result.migrated_from_max_id = this.int();
if (result.flags & 32) result.pinned_msg_id = this.int();
if (result.flags & 256) result.stickerset = this.predicate();
if (result.flags & 512) result.available_min_id = this.int();
if (result.flags & 2048) result.folder_id = this.int();
if (result.flags & 16384) result.linked_chat_id = this.long();
if (result.flags & 32768) result.location = this.predicate();
if (result.flags & 131072) result.slowmode_seconds = this.int();
if (result.flags & 262144) result.slowmode_next_send_date = this.int();
if (result.flags & 4096) result.stats_dc = this.int();
result.pts = this.int();
if (result.flags & 2097152) result.call = this.predicate();
if (result.flags & 16777216) result.ttl_period = this.int();
if (result.flags & 33554432) result.pending_suggestions = this.vector(this.string);
if (result.flags & 67108864) result.groupcall_default_join_as = this.predicate();
if (result.flags & 134217728) result.theme_emoticon = this.string();
if (result.flags & 268435456) result.requests_pending = this.int();
if (result.flags & 268435456) result.recent_requesters = this.vector(this.long);
if (result.flags & 536870912) result.default_send_as = this.predicate();
if (result.flags & 1073741824) result.available_reactions = this.predicate();
if (result.flags2 & 16) result.stories = this.predicate();
if (result.flags2 & 128) result.wallpaper = this.predicate();
return result;
  }],
  [182649427, function() {
const result = { _: 'messageRange' };
result.min_id = this.int();
result.max_id = this.int();
return result;
  }],
  [3346446926, function() {
const result = { _: 'messages.channelMessages' };
result.flags = this.int();
result.inexact = !!(result.flags & 2);
result.pts = this.int();
result.count = this.int();
if (result.flags & 4) result.offset_id_offset = this.int();
result.messages = this.vector(this.predicate, false);
result.topics = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2513611922, function() {
const result = { _: 'messageActionChannelCreate' };
result.title = this.string();
return result;
  }],
  [277713951, function() {
const result = { _: 'updateChannelTooLong' };
result.flags = this.int();
result.channel_id = this.long();
if (result.flags & 1) result.pts = this.int();
return result;
  }],
  [1666927625, function() {
const result = { _: 'updateChannel' };
result.channel_id = this.long();
return result;
  }],
  [1656358105, function() {
const result = { _: 'updateNewChannelMessage' };
result.message = this.predicate();
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [2452516368, function() {
const result = { _: 'updateReadChannelInbox' };
result.flags = this.int();
if (result.flags & 1) result.folder_id = this.int();
result.channel_id = this.long();
result.max_id = this.int();
result.still_unread_count = this.int();
result.pts = this.int();
return result;
  }],
  [3274529554, function() {
const result = { _: 'updateDeleteChannelMessages' };
result.channel_id = this.long();
result.messages = this.vector(this.int, false);
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [4062620680, function() {
const result = { _: 'updateChannelMessageViews' };
result.channel_id = this.long();
result.id = this.int();
result.views = this.int();
return result;
  }],
  [1041346555, function() {
const result = { _: 'updates.channelDifferenceEmpty' };
result.flags = this.int();
result.final = !!(result.flags & 1);
result.pts = this.int();
if (result.flags & 2) result.timeout = this.int();
return result;
  }],
  [2763835134, function() {
const result = { _: 'updates.channelDifferenceTooLong' };
result.flags = this.int();
result.final = !!(result.flags & 1);
if (result.flags & 2) result.timeout = this.int();
result.dialog = this.predicate();
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [543450958, function() {
const result = { _: 'updates.channelDifference' };
result.flags = this.int();
result.final = !!(result.flags & 1);
result.pts = this.int();
if (result.flags & 2) result.timeout = this.int();
result.new_messages = this.vector(this.predicate, false);
result.other_updates = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2496933607, function() {
const result = { _: 'channelMessagesFilterEmpty' };
return result;
  }],
  [3447183703, function() {
const result = { _: 'channelMessagesFilter' };
result.flags = this.int();
result.exclude_new_messages = !!(result.flags & 2);
result.ranges = this.vector(this.predicate, false);
return result;
  }],
  [3222013888, function() {
const result = { _: 'channelParticipant' };
result.user_id = this.long();
result.date = this.int();
return result;
  }],
  [900251559, function() {
const result = { _: 'channelParticipantSelf' };
result.flags = this.int();
result.via_request = !!(result.flags & 1);
result.user_id = this.long();
result.inviter_id = this.long();
result.date = this.int();
return result;
  }],
  [803602899, function() {
const result = { _: 'channelParticipantCreator' };
result.flags = this.int();
result.user_id = this.long();
result.admin_rights = this.predicate();
if (result.flags & 1) result.rank = this.string();
return result;
  }],
  [3728686201, function() {
const result = { _: 'channelParticipantsRecent' };
return result;
  }],
  [3026225513, function() {
const result = { _: 'channelParticipantsAdmins' };
return result;
  }],
  [2746567045, function() {
const result = { _: 'channelParticipantsKicked' };
result.q = this.string();
return result;
  }],
  [2595290799, function() {
const result = { _: 'channels.channelParticipants' };
result.count = this.int();
result.participants = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3753378583, function() {
const result = { _: 'channels.channelParticipant' };
result.participant = this.predicate();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3832270564, function() {
const result = { _: 'chatParticipantCreator' };
result.user_id = this.long();
return result;
  }],
  [2694004571, function() {
const result = { _: 'chatParticipantAdmin' };
result.user_id = this.long();
result.inviter_id = this.long();
result.date = this.int();
return result;
  }],
  [3620364706, function() {
const result = { _: 'updateChatParticipantAdmin' };
result.chat_id = this.long();
result.user_id = this.long();
result.is_admin = this.predicate();
result.version = this.int();
return result;
  }],
  [3775102866, function() {
const result = { _: 'messageActionChatMigrateTo' };
result.channel_id = this.long();
return result;
  }],
  [3929622761, function() {
const result = { _: 'messageActionChannelMigrateFrom' };
result.title = this.string();
result.chat_id = this.long();
return result;
  }],
  [2966521435, function() {
const result = { _: 'channelParticipantsBots' };
return result;
  }],
  [2013922064, function() {
const result = { _: 'help.termsOfService' };
result.flags = this.int();
result.popup = !!(result.flags & 1);
result.id = this.predicate();
result.text = this.string();
result.entities = this.vector(this.predicate, false);
if (result.flags & 2) result.min_age_confirm = this.int();
return result;
  }],
  [1753886890, function() {
const result = { _: 'updateNewStickerSet' };
result.stickerset = this.predicate();
return result;
  }],
  [196268545, function() {
const result = { _: 'updateStickerSetsOrder' };
result.flags = this.int();
result.masks = !!(result.flags & 1);
result.emojis = !!(result.flags & 2);
result.order = this.vector(this.long, false);
return result;
  }],
  [834816008, function() {
const result = { _: 'updateStickerSets' };
result.flags = this.int();
result.masks = !!(result.flags & 1);
result.emojis = !!(result.flags & 2);
return result;
  }],
  [3892468898, function() {
const result = { _: 'messages.savedGifsNotModified' };
return result;
  }],
  [2225089037, function() {
const result = { _: 'messages.savedGifs' };
result.hash = this.long();
result.gifs = this.vector(this.predicate, false);
return result;
  }],
  [2473931806, function() {
const result = { _: 'updateSavedGifs' };
return result;
  }],
  [864077702, function() {
const result = { _: 'inputBotInlineMessageMediaAuto' };
result.flags = this.int();
result.invert_media = !!(result.flags & 8);
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [1036876423, function() {
const result = { _: 'inputBotInlineMessageText' };
result.flags = this.int();
result.no_webpage = !!(result.flags & 1);
result.invert_media = !!(result.flags & 8);
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [2294256409, function() {
const result = { _: 'inputBotInlineResult' };
result.flags = this.int();
result.id = this.string();
result.type = this.string();
if (result.flags & 2) result.title = this.string();
if (result.flags & 4) result.description = this.string();
if (result.flags & 8) result.url = this.string();
if (result.flags & 16) result.thumb = this.predicate();
if (result.flags & 32) result.content = this.predicate();
result.send_message = this.predicate();
return result;
  }],
  [1984755728, function() {
const result = { _: 'botInlineMessageMediaAuto' };
result.flags = this.int();
result.invert_media = !!(result.flags & 8);
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [2357159394, function() {
const result = { _: 'botInlineMessageText' };
result.flags = this.int();
result.no_webpage = !!(result.flags & 1);
result.invert_media = !!(result.flags & 8);
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [295067450, function() {
const result = { _: 'botInlineResult' };
result.flags = this.int();
result.id = this.string();
result.type = this.string();
if (result.flags & 2) result.title = this.string();
if (result.flags & 4) result.description = this.string();
if (result.flags & 8) result.url = this.string();
if (result.flags & 16) result.thumb = this.predicate();
if (result.flags & 32) result.content = this.predicate();
result.send_message = this.predicate();
return result;
  }],
  [3760321270, function() {
const result = { _: 'messages.botResults' };
result.flags = this.int();
result.gallery = !!(result.flags & 1);
result.query_id = this.long();
if (result.flags & 2) result.next_offset = this.string();
if (result.flags & 4) result.switch_pm = this.predicate();
if (result.flags & 8) result.switch_webview = this.predicate();
result.results = this.vector(this.predicate, false);
result.cache_time = this.int();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1232025500, function() {
const result = { _: 'updateBotInlineQuery' };
result.flags = this.int();
result.query_id = this.long();
result.user_id = this.long();
result.query = this.string();
if (result.flags & 1) result.geo = this.predicate();
if (result.flags & 2) result.peer_type = this.predicate();
result.offset = this.string();
return result;
  }],
  [317794823, function() {
const result = { _: 'updateBotInlineSend' };
result.flags = this.int();
result.user_id = this.long();
result.query = this.string();
if (result.flags & 1) result.geo = this.predicate();
result.id = this.string();
if (result.flags & 2) result.msg_id = this.predicate();
return result;
  }],
  [1358283666, function() {
const result = { _: 'inputMessagesFilterVoice' };
return result;
  }],
  [928101534, function() {
const result = { _: 'inputMessagesFilterMusic' };
return result;
  }],
  [3187344422, function() {
const result = { _: 'inputPrivacyKeyChatInvite' };
return result;
  }],
  [1343122938, function() {
const result = { _: 'privacyKeyChatInvite' };
return result;
  }],
  [1571494644, function() {
const result = { _: 'exportedMessageLink' };
result.link = this.string();
result.html = this.string();
return result;
  }],
  [1313731771, function() {
const result = { _: 'messageFwdHeader' };
result.flags = this.int();
result.imported = !!(result.flags & 128);
result.saved_out = !!(result.flags & 2048);
if (result.flags & 1) result.from_id = this.predicate();
if (result.flags & 32) result.from_name = this.string();
result.date = this.int();
if (result.flags & 4) result.channel_post = this.int();
if (result.flags & 8) result.post_author = this.string();
if (result.flags & 16) result.saved_from_peer = this.predicate();
if (result.flags & 16) result.saved_from_msg_id = this.int();
if (result.flags & 256) result.saved_from_id = this.predicate();
if (result.flags & 512) result.saved_from_name = this.string();
if (result.flags & 1024) result.saved_date = this.int();
if (result.flags & 64) result.psa_type = this.string();
return result;
  }],
  [457133559, function() {
const result = { _: 'updateEditChannelMessage' };
result.message = this.predicate();
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [2495428845, function() {
const result = { _: 'messageActionPinMessage' };
return result;
  }],
  [1923290508, function() {
const result = { _: 'auth.codeTypeSms' };
return result;
  }],
  [1948046307, function() {
const result = { _: 'auth.codeTypeCall' };
return result;
  }],
  [577556219, function() {
const result = { _: 'auth.codeTypeFlashCall' };
return result;
  }],
  [1035688326, function() {
const result = { _: 'auth.sentCodeTypeApp' };
result.length = this.int();
return result;
  }],
  [3221273506, function() {
const result = { _: 'auth.sentCodeTypeSms' };
result.length = this.int();
return result;
  }],
  [1398007207, function() {
const result = { _: 'auth.sentCodeTypeCall' };
result.length = this.int();
return result;
  }],
  [2869151449, function() {
const result = { _: 'auth.sentCodeTypeFlashCall' };
result.pattern = this.string();
return result;
  }],
  [629866245, function() {
const result = { _: 'keyboardButtonUrl' };
result.text = this.string();
result.url = this.string();
return result;
  }],
  [901503851, function() {
const result = { _: 'keyboardButtonCallback' };
result.flags = this.int();
result.requires_password = !!(result.flags & 1);
result.text = this.string();
result.data = this.bytes();
return result;
  }],
  [2976541737, function() {
const result = { _: 'keyboardButtonRequestPhone' };
result.text = this.string();
return result;
  }],
  [4235815743, function() {
const result = { _: 'keyboardButtonRequestGeoLocation' };
result.text = this.string();
return result;
  }],
  [2478439349, function() {
const result = { _: 'keyboardButtonSwitchInline' };
result.flags = this.int();
result.same_peer = !!(result.flags & 1);
result.text = this.string();
result.query = this.string();
if (result.flags & 2) result.peer_types = this.vector(this.predicate);
return result;
  }],
  [1218642516, function() {
const result = { _: 'replyInlineMarkup' };
result.rows = this.vector(this.predicate, false);
return result;
  }],
  [911761060, function() {
const result = { _: 'messages.botCallbackAnswer' };
result.flags = this.int();
result.alert = !!(result.flags & 2);
result.has_url = !!(result.flags & 8);
result.native_ui = !!(result.flags & 16);
if (result.flags & 1) result.message = this.string();
if (result.flags & 4) result.url = this.string();
result.cache_time = this.int();
return result;
  }],
  [3117401229, function() {
const result = { _: 'updateBotCallbackQuery' };
result.flags = this.int();
result.query_id = this.long();
result.user_id = this.long();
result.peer = this.predicate();
result.msg_id = this.int();
result.chat_instance = this.long();
if (result.flags & 1) result.data = this.bytes();
if (result.flags & 2) result.game_short_name = this.string();
return result;
  }],
  [649453030, function() {
const result = { _: 'messages.messageEditData' };
result.flags = this.int();
result.caption = !!(result.flags & 1);
return result;
  }],
  [3825430691, function() {
const result = { _: 'updateEditMessage' };
result.message = this.predicate();
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [2526190213, function() {
const result = { _: 'inputBotInlineMessageMediaGeo' };
result.flags = this.int();
result.geo_point = this.predicate();
if (result.flags & 1) result.heading = this.int();
if (result.flags & 2) result.period = this.int();
if (result.flags & 8) result.proximity_notification_radius = this.int();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [1098628881, function() {
const result = { _: 'inputBotInlineMessageMediaVenue' };
result.flags = this.int();
result.geo_point = this.predicate();
result.title = this.string();
result.address = this.string();
result.provider = this.string();
result.venue_id = this.string();
result.venue_type = this.string();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [2800599037, function() {
const result = { _: 'inputBotInlineMessageMediaContact' };
result.flags = this.int();
result.phone_number = this.string();
result.first_name = this.string();
result.last_name = this.string();
result.vcard = this.string();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [85477117, function() {
const result = { _: 'botInlineMessageMediaGeo' };
result.flags = this.int();
result.geo = this.predicate();
if (result.flags & 1) result.heading = this.int();
if (result.flags & 2) result.period = this.int();
if (result.flags & 8) result.proximity_notification_radius = this.int();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [2324063644, function() {
const result = { _: 'botInlineMessageMediaVenue' };
result.flags = this.int();
result.geo = this.predicate();
result.title = this.string();
result.address = this.string();
result.provider = this.string();
result.venue_id = this.string();
result.venue_type = this.string();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [416402882, function() {
const result = { _: 'botInlineMessageMediaContact' };
result.flags = this.int();
result.phone_number = this.string();
result.first_name = this.string();
result.last_name = this.string();
result.vcard = this.string();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [2832753831, function() {
const result = { _: 'inputBotInlineResultPhoto' };
result.id = this.string();
result.type = this.string();
result.photo = this.predicate();
result.send_message = this.predicate();
return result;
  }],
  [4294507972, function() {
const result = { _: 'inputBotInlineResultDocument' };
result.flags = this.int();
result.id = this.string();
result.type = this.string();
if (result.flags & 2) result.title = this.string();
if (result.flags & 4) result.description = this.string();
result.document = this.predicate();
result.send_message = this.predicate();
return result;
  }],
  [400266251, function() {
const result = { _: 'botInlineMediaResult' };
result.flags = this.int();
result.id = this.string();
result.type = this.string();
if (result.flags & 1) result.photo = this.predicate();
if (result.flags & 2) result.document = this.predicate();
if (result.flags & 4) result.title = this.string();
if (result.flags & 8) result.description = this.string();
result.send_message = this.predicate();
return result;
  }],
  [2299280777, function() {
const result = { _: 'inputBotInlineMessageID' };
result.dc_id = this.int();
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [1763610706, function() {
const result = { _: 'updateInlineBotCallbackQuery' };
result.flags = this.int();
result.query_id = this.long();
result.user_id = this.long();
result.msg_id = this.predicate();
result.chat_instance = this.long();
if (result.flags & 1) result.data = this.bytes();
if (result.flags & 2) result.game_short_name = this.string();
return result;
  }],
  [1008755359, function() {
const result = { _: 'inlineBotSwitchPM' };
result.text = this.string();
result.start_param = this.string();
return result;
  }],
  [863093588, function() {
const result = { _: 'messages.peerDialogs' };
result.dialogs = this.vector(this.predicate, false);
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
result.state = this.predicate();
return result;
  }],
  [3989684315, function() {
const result = { _: 'topPeer' };
result.peer = this.predicate();
result.rating = this.double();
return result;
  }],
  [2875595611, function() {
const result = { _: 'topPeerCategoryBotsPM' };
return result;
  }],
  [344356834, function() {
const result = { _: 'topPeerCategoryBotsInline' };
return result;
  }],
  [104314861, function() {
const result = { _: 'topPeerCategoryCorrespondents' };
return result;
  }],
  [3172442442, function() {
const result = { _: 'topPeerCategoryGroups' };
return result;
  }],
  [371037736, function() {
const result = { _: 'topPeerCategoryChannels' };
return result;
  }],
  [4219683473, function() {
const result = { _: 'topPeerCategoryPeers' };
result.category = this.predicate();
result.count = this.int();
result.peers = this.vector(this.predicate, false);
return result;
  }],
  [3727060725, function() {
const result = { _: 'contacts.topPeersNotModified' };
return result;
  }],
  [1891070632, function() {
const result = { _: 'contacts.topPeers' };
result.categories = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3699052864, function() {
const result = { _: 'messageEntityMentionName' };
result.offset = this.int();
result.length = this.int();
result.user_id = this.long();
return result;
  }],
  [546203849, function() {
const result = { _: 'inputMessageEntityMentionName' };
result.offset = this.int();
result.length = this.int();
result.user_id = this.predicate();
return result;
  }],
  [975236280, function() {
const result = { _: 'inputMessagesFilterChatPhotos' };
return result;
  }],
  [3076495785, function() {
const result = { _: 'updateReadChannelOutbox' };
result.channel_id = this.long();
result.max_id = this.int();
return result;
  }],
  [457829485, function() {
const result = { _: 'updateDraftMessage' };
result.flags = this.int();
result.peer = this.predicate();
if (result.flags & 1) result.top_msg_id = this.int();
result.draft = this.predicate();
return result;
  }],
  [453805082, function() {
const result = { _: 'draftMessageEmpty' };
result.flags = this.int();
if (result.flags & 1) result.date = this.int();
return result;
  }],
  [1070397423, function() {
const result = { _: 'draftMessage' };
result.flags = this.int();
result.no_webpage = !!(result.flags & 2);
result.invert_media = !!(result.flags & 64);
if (result.flags & 16) result.reply_to = this.predicate();
result.message = this.string();
if (result.flags & 8) result.entities = this.vector(this.predicate);
if (result.flags & 32) result.media = this.predicate();
result.date = this.int();
return result;
  }],
  [2679813636, function() {
const result = { _: 'messageActionHistoryClear' };
return result;
  }],
  [3336309862, function() {
const result = { _: 'messages.featuredStickersNotModified' };
result.count = this.int();
return result;
  }],
  [3191351558, function() {
const result = { _: 'messages.featuredStickers' };
result.flags = this.int();
result.premium = !!(result.flags & 1);
result.hash = this.long();
result.count = this.int();
result.sets = this.vector(this.predicate, false);
result.unread = this.vector(this.long, false);
return result;
  }],
  [1461528386, function() {
const result = { _: 'updateReadFeaturedStickers' };
return result;
  }],
  [186120336, function() {
const result = { _: 'messages.recentStickersNotModified' };
return result;
  }],
  [2295561302, function() {
const result = { _: 'messages.recentStickers' };
result.hash = this.long();
result.packs = this.vector(this.predicate, false);
result.stickers = this.vector(this.predicate, false);
result.dates = this.vector(this.int, false);
return result;
  }],
  [2588027936, function() {
const result = { _: 'updateRecentStickers' };
return result;
  }],
  [1338747336, function() {
const result = { _: 'messages.archivedStickers' };
result.count = this.int();
result.sets = this.vector(this.predicate, false);
return result;
  }],
  [946083368, function() {
const result = { _: 'messages.stickerSetInstallResultSuccess' };
return result;
  }],
  [904138920, function() {
const result = { _: 'messages.stickerSetInstallResultArchive' };
result.sets = this.vector(this.predicate, false);
return result;
  }],
  [1678812626, function() {
const result = { _: 'stickerSetCovered' };
result.set = this.predicate();
result.cover = this.predicate();
return result;
  }],
  [2720652550, function() {
const result = { _: 'updateConfig' };
return result;
  }],
  [861169551, function() {
const result = { _: 'updatePtsChanged' };
return result;
  }],
  [3854302746, function() {
const result = { _: 'inputMediaPhotoExternal' };
result.flags = this.int();
result.spoiler = !!(result.flags & 2);
result.url = this.string();
if (result.flags & 1) result.ttl_seconds = this.int();
return result;
  }],
  [4216511641, function() {
const result = { _: 'inputMediaDocumentExternal' };
result.flags = this.int();
result.spoiler = !!(result.flags & 2);
result.url = this.string();
if (result.flags & 1) result.ttl_seconds = this.int();
return result;
  }],
  [872932635, function() {
const result = { _: 'stickerSetMultiCovered' };
result.set = this.predicate();
result.covers = this.vector(this.predicate, false);
return result;
  }],
  [2933316530, function() {
const result = { _: 'maskCoords' };
result.n = this.int();
result.x = this.double();
result.y = this.double();
result.zoom = this.double();
return result;
  }],
  [2550256375, function() {
const result = { _: 'documentAttributeHasStickers' };
return result;
  }],
  [1251549527, function() {
const result = { _: 'inputStickeredMediaPhoto' };
result.id = this.predicate();
return result;
  }],
  [70813275, function() {
const result = { _: 'inputStickeredMediaDocument' };
result.id = this.predicate();
return result;
  }],
  [3187238203, function() {
const result = { _: 'game' };
result.flags = this.int();
result.id = this.long();
result.access_hash = this.long();
result.short_name = this.string();
result.title = this.string();
result.description = this.string();
result.photo = this.predicate();
if (result.flags & 1) result.document = this.predicate();
return result;
  }],
  [1336154098, function() {
const result = { _: 'inputBotInlineResultGame' };
result.id = this.string();
result.short_name = this.string();
result.send_message = this.predicate();
return result;
  }],
  [1262639204, function() {
const result = { _: 'inputBotInlineMessageGame' };
result.flags = this.int();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [4256272392, function() {
const result = { _: 'messageMediaGame' };
result.game = this.predicate();
return result;
  }],
  [3544138739, function() {
const result = { _: 'inputMediaGame' };
result.id = this.predicate();
return result;
  }],
  [53231223, function() {
const result = { _: 'inputGameID' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [3274827786, function() {
const result = { _: 'inputGameShortName' };
result.bot_id = this.predicate();
result.short_name = this.string();
return result;
  }],
  [1358175439, function() {
const result = { _: 'keyboardButtonGame' };
result.text = this.string();
return result;
  }],
  [2460428406, function() {
const result = { _: 'messageActionGameScore' };
result.game_id = this.long();
result.score = this.int();
return result;
  }],
  [1940093419, function() {
const result = { _: 'highScore' };
result.pos = this.int();
result.user_id = this.long();
result.score = this.int();
return result;
  }],
  [2587622809, function() {
const result = { _: 'messages.highScores' };
result.scores = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1258196845, function() {
const result = { _: 'updates.differenceTooLong' };
result.pts = this.int();
return result;
  }],
  [791390623, function() {
const result = { _: 'updateChannelWebPage' };
result.channel_id = this.long();
result.webpage = this.predicate();
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [2631405892, function() {
const result = { _: 'messages.chatsSlice' };
result.count = this.int();
result.chats = this.vector(this.predicate, false);
return result;
  }],
  [3695018575, function() {
const result = { _: 'textEmpty' };
return result;
  }],
  [1950782688, function() {
const result = { _: 'textPlain' };
result.text = this.string();
return result;
  }],
  [1730456516, function() {
const result = { _: 'textBold' };
result.text = this.predicate();
return result;
  }],
  [3641877916, function() {
const result = { _: 'textItalic' };
result.text = this.predicate();
return result;
  }],
  [3240501956, function() {
const result = { _: 'textUnderline' };
result.text = this.predicate();
return result;
  }],
  [2616769429, function() {
const result = { _: 'textStrike' };
result.text = this.predicate();
return result;
  }],
  [1816074681, function() {
const result = { _: 'textFixed' };
result.text = this.predicate();
return result;
  }],
  [1009288385, function() {
const result = { _: 'textUrl' };
result.text = this.predicate();
result.url = this.string();
result.webpage_id = this.long();
return result;
  }],
  [3730443734, function() {
const result = { _: 'textEmail' };
result.text = this.predicate();
result.email = this.string();
return result;
  }],
  [2120376535, function() {
const result = { _: 'textConcat' };
result.texts = this.vector(this.predicate, false);
return result;
  }],
  [324435594, function() {
const result = { _: 'pageBlockUnsupported' };
return result;
  }],
  [1890305021, function() {
const result = { _: 'pageBlockTitle' };
result.text = this.predicate();
return result;
  }],
  [2415565343, function() {
const result = { _: 'pageBlockSubtitle' };
result.text = this.predicate();
return result;
  }],
  [3132089824, function() {
const result = { _: 'pageBlockAuthorDate' };
result.author = this.predicate();
result.published_date = this.int();
return result;
  }],
  [3218105580, function() {
const result = { _: 'pageBlockHeader' };
result.text = this.predicate();
return result;
  }],
  [4046173921, function() {
const result = { _: 'pageBlockSubheader' };
result.text = this.predicate();
return result;
  }],
  [1182402406, function() {
const result = { _: 'pageBlockParagraph' };
result.text = this.predicate();
return result;
  }],
  [3228621118, function() {
const result = { _: 'pageBlockPreformatted' };
result.text = this.predicate();
result.language = this.string();
return result;
  }],
  [1216809369, function() {
const result = { _: 'pageBlockFooter' };
result.text = this.predicate();
return result;
  }],
  [3676352904, function() {
const result = { _: 'pageBlockDivider' };
return result;
  }],
  [3456972720, function() {
const result = { _: 'pageBlockAnchor' };
result.name = this.string();
return result;
  }],
  [3840442385, function() {
const result = { _: 'pageBlockList' };
result.items = this.vector(this.predicate, false);
return result;
  }],
  [641563686, function() {
const result = { _: 'pageBlockBlockquote' };
result.text = this.predicate();
result.caption = this.predicate();
return result;
  }],
  [1329878739, function() {
const result = { _: 'pageBlockPullquote' };
result.text = this.predicate();
result.caption = this.predicate();
return result;
  }],
  [391759200, function() {
const result = { _: 'pageBlockPhoto' };
result.flags = this.int();
result.photo_id = this.long();
result.caption = this.predicate();
if (result.flags & 1) result.url = this.string();
if (result.flags & 1) result.webpage_id = this.long();
return result;
  }],
  [2089805750, function() {
const result = { _: 'pageBlockVideo' };
result.flags = this.int();
result.autoplay = !!(result.flags & 1);
result.loop = !!(result.flags & 2);
result.video_id = this.long();
result.caption = this.predicate();
return result;
  }],
  [972174080, function() {
const result = { _: 'pageBlockCover' };
result.cover = this.predicate();
return result;
  }],
  [2826014149, function() {
const result = { _: 'pageBlockEmbed' };
result.flags = this.int();
result.full_width = !!(result.flags & 1);
result.allow_scrolling = !!(result.flags & 8);
if (result.flags & 2) result.url = this.string();
if (result.flags & 4) result.html = this.string();
if (result.flags & 16) result.poster_photo_id = this.long();
if (result.flags & 32) result.w = this.int();
if (result.flags & 32) result.h = this.int();
result.caption = this.predicate();
return result;
  }],
  [4065961995, function() {
const result = { _: 'pageBlockEmbedPost' };
result.url = this.string();
result.webpage_id = this.long();
result.author_photo_id = this.long();
result.author = this.string();
result.date = this.int();
result.blocks = this.vector(this.predicate, false);
result.caption = this.predicate();
return result;
  }],
  [1705048653, function() {
const result = { _: 'pageBlockCollage' };
result.items = this.vector(this.predicate, false);
result.caption = this.predicate();
return result;
  }],
  [52401552, function() {
const result = { _: 'pageBlockSlideshow' };
result.items = this.vector(this.predicate, false);
result.caption = this.predicate();
return result;
  }],
  [1930545681, function() {
const result = { _: 'webPageNotModified' };
result.flags = this.int();
if (result.flags & 1) result.cached_page_views = this.int();
return result;
  }],
  [4206550111, function() {
const result = { _: 'inputPrivacyKeyPhoneCall' };
return result;
  }],
  [1030105979, function() {
const result = { _: 'privacyKeyPhoneCall' };
return result;
  }],
  [3714748232, function() {
const result = { _: 'sendMessageGamePlayAction' };
return result;
  }],
  [2246320897, function() {
const result = { _: 'phoneCallDiscardReasonMissed' };
return result;
  }],
  [3767910816, function() {
const result = { _: 'phoneCallDiscardReasonDisconnect' };
return result;
  }],
  [1471006352, function() {
const result = { _: 'phoneCallDiscardReasonHangup' };
return result;
  }],
  [4210550985, function() {
const result = { _: 'phoneCallDiscardReasonBusy' };
return result;
  }],
  [1852826908, function() {
const result = { _: 'updateDialogPinned' };
result.flags = this.int();
result.pinned = !!(result.flags & 1);
if (result.flags & 2) result.folder_id = this.int();
result.peer = this.predicate();
return result;
  }],
  [4195302562, function() {
const result = { _: 'updatePinnedDialogs' };
result.flags = this.int();
if (result.flags & 2) result.folder_id = this.int();
if (result.flags & 1) result.order = this.vector(this.predicate);
return result;
  }],
  [2104790276, function() {
const result = { _: 'dataJSON' };
result.data = this.string();
return result;
  }],
  [2199371971, function() {
const result = { _: 'updateBotWebhookJSON' };
result.data = this.predicate();
return result;
  }],
  [2610053286, function() {
const result = { _: 'updateBotWebhookJSONQuery' };
result.query_id = this.long();
result.data = this.predicate();
result.timeout = this.int();
return result;
  }],
  [3408489464, function() {
const result = { _: 'labeledPrice' };
result.label = this.string();
result.amount = this.long();
return result;
  }],
  [1572428309, function() {
const result = { _: 'invoice' };
result.flags = this.int();
result.test = !!(result.flags & 1);
result.name_requested = !!(result.flags & 2);
result.phone_requested = !!(result.flags & 4);
result.email_requested = !!(result.flags & 8);
result.shipping_address_requested = !!(result.flags & 16);
result.flexible = !!(result.flags & 32);
result.phone_to_provider = !!(result.flags & 64);
result.email_to_provider = !!(result.flags & 128);
result.recurring = !!(result.flags & 512);
result.currency = this.string();
result.prices = this.vector(this.predicate, false);
if (result.flags & 256) result.max_tip_amount = this.long();
if (result.flags & 256) result.suggested_tip_amounts = this.vector(this.long);
if (result.flags & 1024) result.terms_url = this.string();
return result;
  }],
  [2394269397, function() {
const result = { _: 'inputMediaInvoice' };
result.flags = this.int();
result.title = this.string();
result.description = this.string();
if (result.flags & 1) result.photo = this.predicate();
result.invoice = this.predicate();
result.payload = this.bytes();
result.provider = this.string();
result.provider_data = this.predicate();
if (result.flags & 2) result.start_param = this.string();
if (result.flags & 4) result.extended_media = this.predicate();
return result;
  }],
  [3926049406, function() {
const result = { _: 'paymentCharge' };
result.id = this.string();
result.provider_charge_id = this.string();
return result;
  }],
  [2402399015, function() {
const result = { _: 'messageActionPaymentSentMe' };
result.flags = this.int();
result.recurring_init = !!(result.flags & 4);
result.recurring_used = !!(result.flags & 8);
result.currency = this.string();
result.total_amount = this.long();
result.payload = this.bytes();
if (result.flags & 1) result.info = this.predicate();
if (result.flags & 2) result.shipping_option_id = this.string();
result.charge = this.predicate();
return result;
  }],
  [4138027219, function() {
const result = { _: 'messageMediaInvoice' };
result.flags = this.int();
result.shipping_address_requested = !!(result.flags & 2);
result.test = !!(result.flags & 8);
result.title = this.string();
result.description = this.string();
if (result.flags & 1) result.photo = this.predicate();
if (result.flags & 4) result.receipt_msg_id = this.int();
result.currency = this.string();
result.total_amount = this.long();
result.start_param = this.string();
if (result.flags & 16) result.extended_media = this.predicate();
return result;
  }],
  [512535275, function() {
const result = { _: 'postAddress' };
result.street_line1 = this.string();
result.street_line2 = this.string();
result.city = this.string();
result.state = this.string();
result.country_iso2 = this.string();
result.post_code = this.string();
return result;
  }],
  [2426158996, function() {
const result = { _: 'paymentRequestedInfo' };
result.flags = this.int();
if (result.flags & 1) result.name = this.string();
if (result.flags & 2) result.phone = this.string();
if (result.flags & 4) result.email = this.string();
if (result.flags & 8) result.shipping_address = this.predicate();
return result;
  }],
  [2950250427, function() {
const result = { _: 'keyboardButtonBuy' };
result.text = this.string();
return result;
  }],
  [2518040406, function() {
const result = { _: 'messageActionPaymentSent' };
result.flags = this.int();
result.recurring_init = !!(result.flags & 4);
result.recurring_used = !!(result.flags & 8);
result.currency = this.string();
result.total_amount = this.long();
if (result.flags & 1) result.invoice_slug = this.string();
return result;
  }],
  [3452074527, function() {
const result = { _: 'paymentSavedCredentialsCard' };
result.id = this.string();
result.title = this.string();
return result;
  }],
  [475467473, function() {
const result = { _: 'webDocument' };
result.url = this.string();
result.access_hash = this.long();
result.size = this.int();
result.mime_type = this.string();
result.attributes = this.vector(this.predicate, false);
return result;
  }],
  [2616017741, function() {
const result = { _: 'inputWebDocument' };
result.url = this.string();
result.size = this.int();
result.mime_type = this.string();
result.attributes = this.vector(this.predicate, false);
return result;
  }],
  [3258570374, function() {
const result = { _: 'inputWebFileLocation' };
result.url = this.string();
result.access_hash = this.long();
return result;
  }],
  [568808380, function() {
const result = { _: 'upload.webFile' };
result.size = this.int();
result.mime_type = this.string();
result.file_type = this.predicate();
result.mtime = this.int();
result.bytes = this.bytes();
return result;
  }],
  [2684716881, function() {
const result = { _: 'payments.paymentForm' };
result.flags = this.int();
result.can_save_credentials = !!(result.flags & 4);
result.password_missing = !!(result.flags & 8);
result.form_id = this.long();
result.bot_id = this.long();
result.title = this.string();
result.description = this.string();
if (result.flags & 32) result.photo = this.predicate();
result.invoice = this.predicate();
result.provider_id = this.long();
result.url = this.string();
if (result.flags & 16) result.native_provider = this.string();
if (result.flags & 16) result.native_params = this.predicate();
if (result.flags & 64) result.additional_methods = this.vector(this.predicate);
if (result.flags & 1) result.saved_info = this.predicate();
if (result.flags & 2) result.saved_credentials = this.vector(this.predicate);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3510966403, function() {
const result = { _: 'payments.validatedRequestedInfo' };
result.flags = this.int();
if (result.flags & 1) result.id = this.string();
if (result.flags & 2) result.shipping_options = this.vector(this.predicate);
return result;
  }],
  [1314881805, function() {
const result = { _: 'payments.paymentResult' };
result.updates = this.predicate();
return result;
  }],
  [1891958275, function() {
const result = { _: 'payments.paymentReceipt' };
result.flags = this.int();
result.date = this.int();
result.bot_id = this.long();
result.provider_id = this.long();
result.title = this.string();
result.description = this.string();
if (result.flags & 4) result.photo = this.predicate();
result.invoice = this.predicate();
if (result.flags & 1) result.info = this.predicate();
if (result.flags & 2) result.shipping = this.predicate();
if (result.flags & 8) result.tip_amount = this.long();
result.currency = this.string();
result.total_amount = this.long();
result.credentials_title = this.string();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [4220511292, function() {
const result = { _: 'payments.savedInfo' };
result.flags = this.int();
result.has_saved_credentials = !!(result.flags & 2);
if (result.flags & 1) result.saved_info = this.predicate();
return result;
  }],
  [3238965967, function() {
const result = { _: 'inputPaymentCredentialsSaved' };
result.id = this.string();
result.tmp_password = this.bytes();
return result;
  }],
  [873977640, function() {
const result = { _: 'inputPaymentCredentials' };
result.flags = this.int();
result.save = !!(result.flags & 1);
result.data = this.predicate();
return result;
  }],
  [3680828724, function() {
const result = { _: 'account.tmpPassword' };
result.tmp_password = this.bytes();
result.valid_until = this.int();
return result;
  }],
  [3055631583, function() {
const result = { _: 'shippingOption' };
result.id = this.string();
result.title = this.string();
result.prices = this.vector(this.predicate, false);
return result;
  }],
  [3048144253, function() {
const result = { _: 'updateBotShippingQuery' };
result.query_id = this.long();
result.user_id = this.long();
result.payload = this.bytes();
result.shipping_address = this.predicate();
return result;
  }],
  [2359990934, function() {
const result = { _: 'updateBotPrecheckoutQuery' };
result.flags = this.int();
result.query_id = this.long();
result.user_id = this.long();
result.payload = this.bytes();
if (result.flags & 1) result.info = this.predicate();
if (result.flags & 2) result.shipping_option_id = this.string();
result.currency = this.string();
result.total_amount = this.long();
return result;
  }],
  [853188252, function() {
const result = { _: 'inputStickerSetItem' };
result.flags = this.int();
result.document = this.predicate();
result.emoji = this.string();
if (result.flags & 1) result.mask_coords = this.predicate();
if (result.flags & 2) result.keywords = this.string();
return result;
  }],
  [2869914398, function() {
const result = { _: 'updatePhoneCall' };
result.phone_call = this.predicate();
return result;
  }],
  [506920429, function() {
const result = { _: 'inputPhoneCall' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [1399245077, function() {
const result = { _: 'phoneCallEmpty' };
result.id = this.long();
return result;
  }],
  [3307368215, function() {
const result = { _: 'phoneCallWaiting' };
result.flags = this.int();
result.video = !!(result.flags & 64);
result.id = this.long();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.long();
result.participant_id = this.long();
result.protocol = this.predicate();
if (result.flags & 1) result.receive_date = this.int();
return result;
  }],
  [347139340, function() {
const result = { _: 'phoneCallRequested' };
result.flags = this.int();
result.video = !!(result.flags & 64);
result.id = this.long();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.long();
result.participant_id = this.long();
result.g_a_hash = this.bytes();
result.protocol = this.predicate();
return result;
  }],
  [912311057, function() {
const result = { _: 'phoneCallAccepted' };
result.flags = this.int();
result.video = !!(result.flags & 64);
result.id = this.long();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.long();
result.participant_id = this.long();
result.g_b = this.bytes();
result.protocol = this.predicate();
return result;
  }],
  [2524937319, function() {
const result = { _: 'phoneCall' };
result.flags = this.int();
result.p2p_allowed = !!(result.flags & 32);
result.video = !!(result.flags & 64);
result.id = this.long();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.long();
result.participant_id = this.long();
result.g_a_or_b = this.bytes();
result.key_fingerprint = this.long();
result.protocol = this.predicate();
result.connections = this.vector(this.predicate, false);
result.start_date = this.int();
return result;
  }],
  [1355435489, function() {
const result = { _: 'phoneCallDiscarded' };
result.flags = this.int();
result.need_rating = !!(result.flags & 4);
result.need_debug = !!(result.flags & 8);
result.video = !!(result.flags & 64);
result.id = this.long();
if (result.flags & 1) result.reason = this.predicate();
if (result.flags & 2) result.duration = this.int();
return result;
  }],
  [2629903303, function() {
const result = { _: 'phoneConnection' };
result.flags = this.int();
result.tcp = !!(result.flags & 1);
result.id = this.long();
result.ip = this.string();
result.ipv6 = this.string();
result.port = this.int();
result.peer_tag = this.bytes();
return result;
  }],
  [4236742600, function() {
const result = { _: 'phoneCallProtocol' };
result.flags = this.int();
result.udp_p2p = !!(result.flags & 1);
result.udp_reflector = !!(result.flags & 2);
result.min_layer = this.int();
result.max_layer = this.int();
result.library_versions = this.vector(this.string, false);
return result;
  }],
  [3968000320, function() {
const result = { _: 'phone.phoneCall' };
result.phone_call = this.predicate();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2160695144, function() {
const result = { _: 'inputMessagesFilterPhoneCalls' };
result.flags = this.int();
result.missed = !!(result.flags & 1);
return result;
  }],
  [2162236031, function() {
const result = { _: 'messageActionPhoneCall' };
result.flags = this.int();
result.video = !!(result.flags & 4);
result.call_id = this.long();
if (result.flags & 1) result.reason = this.predicate();
if (result.flags & 2) result.duration = this.int();
return result;
  }],
  [2054952868, function() {
const result = { _: 'inputMessagesFilterRoundVoice' };
return result;
  }],
  [3041516115, function() {
const result = { _: 'inputMessagesFilterRoundVideo' };
return result;
  }],
  [2297593788, function() {
const result = { _: 'sendMessageRecordRoundAction' };
return result;
  }],
  [608050278, function() {
const result = { _: 'sendMessageUploadRoundAction' };
result.progress = this.int();
return result;
  }],
  [4052539972, function() {
const result = { _: 'upload.fileCdnRedirect' };
result.dc_id = this.int();
result.file_token = this.bytes();
result.encryption_key = this.bytes();
result.encryption_iv = this.bytes();
result.file_hashes = this.vector(this.predicate, false);
return result;
  }],
  [4004045934, function() {
const result = { _: 'upload.cdnFileReuploadNeeded' };
result.request_token = this.bytes();
return result;
  }],
  [2845821519, function() {
const result = { _: 'upload.cdnFile' };
result.bytes = this.bytes();
return result;
  }],
  [3380800186, function() {
const result = { _: 'cdnPublicKey' };
result.dc_id = this.int();
result.public_key = this.string();
return result;
  }],
  [1462101002, function() {
const result = { _: 'cdnConfig' };
result.public_keys = this.vector(this.predicate, false);
return result;
  }],
  [4011282869, function() {
const result = { _: 'pageBlockChannel' };
result.channel = this.predicate();
return result;
  }],
  [3402727926, function() {
const result = { _: 'langPackString' };
result.key = this.string();
result.value = this.string();
return result;
  }],
  [1816636575, function() {
const result = { _: 'langPackStringPluralized' };
result.flags = this.int();
result.key = this.string();
if (result.flags & 1) result.zero_value = this.string();
if (result.flags & 2) result.one_value = this.string();
if (result.flags & 4) result.two_value = this.string();
if (result.flags & 8) result.few_value = this.string();
if (result.flags & 16) result.many_value = this.string();
result.other_value = this.string();
return result;
  }],
  [695856818, function() {
const result = { _: 'langPackStringDeleted' };
result.key = this.string();
return result;
  }],
  [4085629430, function() {
const result = { _: 'langPackDifference' };
result.lang_code = this.string();
result.from_version = this.int();
result.version = this.int();
result.strings = this.vector(this.predicate, false);
return result;
  }],
  [4006239459, function() {
const result = { _: 'langPackLanguage' };
result.flags = this.int();
result.official = !!(result.flags & 1);
result.rtl = !!(result.flags & 4);
result.beta = !!(result.flags & 8);
result.name = this.string();
result.native_name = this.string();
result.lang_code = this.string();
if (result.flags & 2) result.base_lang_code = this.string();
result.plural_code = this.string();
result.strings_count = this.int();
result.translated_count = this.int();
result.translations_url = this.string();
return result;
  }],
  [1180041828, function() {
const result = { _: 'updateLangPackTooLong' };
result.lang_code = this.string();
return result;
  }],
  [1442983757, function() {
const result = { _: 'updateLangPack' };
result.difference = this.predicate();
return result;
  }],
  [885242707, function() {
const result = { _: 'channelParticipantAdmin' };
result.flags = this.int();
result.can_edit = !!(result.flags & 1);
result.self = !!(result.flags & 2);
result.user_id = this.long();
if (result.flags & 2) result.inviter_id = this.long();
result.promoted_by = this.long();
result.date = this.int();
result.admin_rights = this.predicate();
if (result.flags & 4) result.rank = this.string();
return result;
  }],
  [1844969806, function() {
const result = { _: 'channelParticipantBanned' };
result.flags = this.int();
result.left = !!(result.flags & 1);
result.peer = this.predicate();
result.kicked_by = this.long();
result.date = this.int();
result.banned_rights = this.predicate();
return result;
  }],
  [338142689, function() {
const result = { _: 'channelParticipantsBanned' };
result.q = this.string();
return result;
  }],
  [106343499, function() {
const result = { _: 'channelParticipantsSearch' };
result.q = this.string();
return result;
  }],
  [3873421349, function() {
const result = { _: 'channelAdminLogEventActionChangeTitle' };
result.prev_value = this.string();
result.new_value = this.string();
return result;
  }],
  [1427671598, function() {
const result = { _: 'channelAdminLogEventActionChangeAbout' };
result.prev_value = this.string();
result.new_value = this.string();
return result;
  }],
  [1783299128, function() {
const result = { _: 'channelAdminLogEventActionChangeUsername' };
result.prev_value = this.string();
result.new_value = this.string();
return result;
  }],
  [1129042607, function() {
const result = { _: 'channelAdminLogEventActionChangePhoto' };
result.prev_photo = this.predicate();
result.new_photo = this.predicate();
return result;
  }],
  [460916654, function() {
const result = { _: 'channelAdminLogEventActionToggleInvites' };
result.new_value = this.predicate();
return result;
  }],
  [648939889, function() {
const result = { _: 'channelAdminLogEventActionToggleSignatures' };
result.new_value = this.predicate();
return result;
  }],
  [3924306968, function() {
const result = { _: 'channelAdminLogEventActionUpdatePinned' };
result.message = this.predicate();
return result;
  }],
  [1889215493, function() {
const result = { _: 'channelAdminLogEventActionEditMessage' };
result.prev_message = this.predicate();
result.new_message = this.predicate();
return result;
  }],
  [1121994683, function() {
const result = { _: 'channelAdminLogEventActionDeleteMessage' };
result.message = this.predicate();
return result;
  }],
  [405815507, function() {
const result = { _: 'channelAdminLogEventActionParticipantJoin' };
return result;
  }],
  [4170676210, function() {
const result = { _: 'channelAdminLogEventActionParticipantLeave' };
return result;
  }],
  [3810276568, function() {
const result = { _: 'channelAdminLogEventActionParticipantInvite' };
result.participant = this.predicate();
return result;
  }],
  [3872931198, function() {
const result = { _: 'channelAdminLogEventActionParticipantToggleBan' };
result.prev_participant = this.predicate();
result.new_participant = this.predicate();
return result;
  }],
  [3580323600, function() {
const result = { _: 'channelAdminLogEventActionParticipantToggleAdmin' };
result.prev_participant = this.predicate();
result.new_participant = this.predicate();
return result;
  }],
  [531458253, function() {
const result = { _: 'channelAdminLogEvent' };
result.id = this.long();
result.date = this.int();
result.user_id = this.long();
result.action = this.predicate();
return result;
  }],
  [3985307469, function() {
const result = { _: 'channels.adminLogResults' };
result.events = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3926948580, function() {
const result = { _: 'channelAdminLogEventsFilter' };
result.flags = this.int();
result.join = !!(result.flags & 1);
result.leave = !!(result.flags & 2);
result.invite = !!(result.flags & 4);
result.ban = !!(result.flags & 8);
result.unban = !!(result.flags & 16);
result.kick = !!(result.flags & 32);
result.unkick = !!(result.flags & 64);
result.promote = !!(result.flags & 128);
result.demote = !!(result.flags & 256);
result.info = !!(result.flags & 512);
result.settings = !!(result.flags & 1024);
result.pinned = !!(result.flags & 2048);
result.edit = !!(result.flags & 4096);
result.delete = !!(result.flags & 8192);
result.group_call = !!(result.flags & 16384);
result.invites = !!(result.flags & 32768);
result.send = !!(result.flags & 65536);
result.forums = !!(result.flags & 131072);
return result;
  }],
  [511092620, function() {
const result = { _: 'topPeerCategoryPhoneCalls' };
return result;
  }],
  [2151899626, function() {
const result = { _: 'pageBlockAudio' };
result.audio_id = this.long();
result.caption = this.predicate();
return result;
  }],
  [1558266229, function() {
const result = { _: 'popularContact' };
result.client_id = this.long();
result.importers = this.int();
return result;
  }],
  [1200788123, function() {
const result = { _: 'messageActionScreenshotTaken' };
return result;
  }],
  [2660214483, function() {
const result = { _: 'messages.favedStickersNotModified' };
return result;
  }],
  [750063767, function() {
const result = { _: 'messages.favedStickers' };
result.hash = this.long();
result.packs = this.vector(this.predicate, false);
result.stickers = this.vector(this.predicate, false);
return result;
  }],
  [3843135853, function() {
const result = { _: 'updateFavedStickers' };
return result;
  }],
  [3928556893, function() {
const result = { _: 'updateChannelReadMessagesContents' };
result.flags = this.int();
result.channel_id = this.long();
if (result.flags & 1) result.top_msg_id = this.int();
result.messages = this.vector(this.int, false);
return result;
  }],
  [3254314650, function() {
const result = { _: 'inputMessagesFilterMyMentions' };
return result;
  }],
  [1887741886, function() {
const result = { _: 'updateContactsReset' };
return result;
  }],
  [2982398631, function() {
const result = { _: 'channelAdminLogEventActionChangeStickerSet' };
result.prev_stickerset = this.predicate();
result.new_stickerset = this.predicate();
return result;
  }],
  [4209418070, function() {
const result = { _: 'messageActionCustomAction' };
result.message = this.string();
return result;
  }],
  [178373535, function() {
const result = { _: 'inputPaymentCredentialsApplePay' };
result.payment_data = this.predicate();
return result;
  }],
  [3875695885, function() {
const result = { _: 'inputMessagesFilterGeo' };
return result;
  }],
  [3764575107, function() {
const result = { _: 'inputMessagesFilterContacts' };
return result;
  }],
  [2990524056, function() {
const result = { _: 'updateChannelAvailableMessages' };
result.channel_id = this.long();
result.available_min_id = this.int();
return result;
  }],
  [1599903217, function() {
const result = { _: 'channelAdminLogEventActionTogglePreHistoryHidden' };
result.new_value = this.predicate();
return result;
  }],
  [2535434307, function() {
const result = { _: 'inputMediaGeoLive' };
result.flags = this.int();
result.stopped = !!(result.flags & 1);
result.geo_point = this.predicate();
if (result.flags & 4) result.heading = this.int();
if (result.flags & 2) result.period = this.int();
if (result.flags & 8) result.proximity_notification_radius = this.int();
return result;
  }],
  [3108030054, function() {
const result = { _: 'messageMediaGeoLive' };
result.flags = this.int();
result.geo = this.predicate();
if (result.flags & 1) result.heading = this.int();
result.period = this.int();
if (result.flags & 2) result.proximity_notification_radius = this.int();
return result;
  }],
  [1189204285, function() {
const result = { _: 'recentMeUrlUnknown' };
result.url = this.string();
return result;
  }],
  [3106671074, function() {
const result = { _: 'recentMeUrlUser' };
result.url = this.string();
result.user_id = this.long();
return result;
  }],
  [3000660434, function() {
const result = { _: 'recentMeUrlChat' };
result.url = this.string();
result.chat_id = this.long();
return result;
  }],
  [3947431965, function() {
const result = { _: 'recentMeUrlChatInvite' };
result.url = this.string();
result.chat_invite = this.predicate();
return result;
  }],
  [3154794460, function() {
const result = { _: 'recentMeUrlStickerSet' };
result.url = this.string();
result.set = this.predicate();
return result;
  }],
  [235081943, function() {
const result = { _: 'help.recentMeUrls' };
result.urls = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [4028055529, function() {
const result = { _: 'channels.channelParticipantsNotModified' };
return result;
  }],
  [1951620897, function() {
const result = { _: 'messages.messagesNotModified' };
result.count = this.int();
return result;
  }],
  [482797855, function() {
const result = { _: 'inputSingleMedia' };
result.flags = this.int();
result.media = this.predicate();
result.random_id = this.long();
result.message = this.string();
if (result.flags & 1) result.entities = this.vector(this.predicate);
return result;
  }],
  [2801333330, function() {
const result = { _: 'webAuthorization' };
result.hash = this.long();
result.bot_id = this.long();
result.domain = this.string();
result.browser = this.string();
result.platform = this.string();
result.date_created = this.int();
result.date_active = this.int();
result.ip = this.string();
result.region = this.string();
return result;
  }],
  [3981887996, function() {
const result = { _: 'account.webAuthorizations' };
result.authorizations = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2792792866, function() {
const result = { _: 'inputMessageID' };
result.id = this.int();
return result;
  }],
  [3134751637, function() {
const result = { _: 'inputMessageReplyTo' };
result.id = this.int();
return result;
  }],
  [2257003832, function() {
const result = { _: 'inputMessagePinned' };
return result;
  }],
  [2607407947, function() {
const result = { _: 'messageEntityPhone' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [1280209983, function() {
const result = { _: 'messageEntityCashtag' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [3306608249, function() {
const result = { _: 'messageActionBotAllowed' };
result.flags = this.int();
result.attach_menu = !!(result.flags & 2);
result.from_request = !!(result.flags & 8);
if (result.flags & 1) result.domain = this.string();
if (result.flags & 4) result.app = this.predicate();
return result;
  }],
  [4239064759, function() {
const result = { _: 'inputDialogPeer' };
result.peer = this.predicate();
return result;
  }],
  [3849174789, function() {
const result = { _: 'dialogPeer' };
result.peer = this.predicate();
return result;
  }],
  [223655517, function() {
const result = { _: 'messages.foundStickerSetsNotModified' };
return result;
  }],
  [2331024850, function() {
const result = { _: 'messages.foundStickerSets' };
result.hash = this.long();
result.sets = this.vector(this.predicate, false);
return result;
  }],
  [4087022428, function() {
const result = { _: 'fileHash' };
result.offset = this.long();
result.limit = this.int();
result.hash = this.bytes();
return result;
  }],
  [4190682310, function() {
const result = { _: 'webDocumentNoProxy' };
result.url = this.string();
result.size = this.int();
result.mime_type = this.string();
result.attributes = this.vector(this.predicate, false);
return result;
  }],
  [1968737087, function() {
const result = { _: 'inputClientProxy' };
result.address = this.string();
result.port = this.int();
return result;
  }],
  [3811614591, function() {
const result = { _: 'help.termsOfServiceUpdateEmpty' };
result.expires = this.int();
return result;
  }],
  [686618977, function() {
const result = { _: 'help.termsOfServiceUpdate' };
result.expires = this.int();
result.terms_of_service = this.predicate();
return result;
  }],
  [859091184, function() {
const result = { _: 'inputSecureFileUploaded' };
result.id = this.long();
result.parts = this.int();
result.md5_checksum = this.string();
result.file_hash = this.bytes();
result.secret = this.bytes();
return result;
  }],
  [1399317950, function() {
const result = { _: 'inputSecureFile' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [3418877480, function() {
const result = { _: 'inputSecureFileLocation' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [1679398724, function() {
const result = { _: 'secureFileEmpty' };
return result;
  }],
  [2097791614, function() {
const result = { _: 'secureFile' };
result.id = this.long();
result.access_hash = this.long();
result.size = this.long();
result.dc_id = this.int();
result.date = this.int();
result.file_hash = this.bytes();
result.secret = this.bytes();
return result;
  }],
  [2330640067, function() {
const result = { _: 'secureData' };
result.data = this.bytes();
result.data_hash = this.bytes();
result.secret = this.bytes();
return result;
  }],
  [2103482845, function() {
const result = { _: 'securePlainPhone' };
result.phone = this.string();
return result;
  }],
  [569137759, function() {
const result = { _: 'securePlainEmail' };
result.email = this.string();
return result;
  }],
  [2636808675, function() {
const result = { _: 'secureValueTypePersonalDetails' };
return result;
  }],
  [1034709504, function() {
const result = { _: 'secureValueTypePassport' };
return result;
  }],
  [115615172, function() {
const result = { _: 'secureValueTypeDriverLicense' };
return result;
  }],
  [2698015819, function() {
const result = { _: 'secureValueTypeIdentityCard' };
return result;
  }],
  [2577698595, function() {
const result = { _: 'secureValueTypeInternalPassport' };
return result;
  }],
  [3420659238, function() {
const result = { _: 'secureValueTypeAddress' };
return result;
  }],
  [4231435598, function() {
const result = { _: 'secureValueTypeUtilityBill' };
return result;
  }],
  [2299755533, function() {
const result = { _: 'secureValueTypeBankStatement' };
return result;
  }],
  [2340959368, function() {
const result = { _: 'secureValueTypeRentalAgreement' };
return result;
  }],
  [2581823594, function() {
const result = { _: 'secureValueTypePassportRegistration' };
return result;
  }],
  [3926060083, function() {
const result = { _: 'secureValueTypeTemporaryRegistration' };
return result;
  }],
  [3005262555, function() {
const result = { _: 'secureValueTypePhone' };
return result;
  }],
  [2386339822, function() {
const result = { _: 'secureValueTypeEmail' };
return result;
  }],
  [411017418, function() {
const result = { _: 'secureValue' };
result.flags = this.int();
result.type = this.predicate();
if (result.flags & 1) result.data = this.predicate();
if (result.flags & 2) result.front_side = this.predicate();
if (result.flags & 4) result.reverse_side = this.predicate();
if (result.flags & 8) result.selfie = this.predicate();
if (result.flags & 64) result.translation = this.vector(this.predicate);
if (result.flags & 16) result.files = this.vector(this.predicate);
if (result.flags & 32) result.plain_data = this.predicate();
result.hash = this.bytes();
return result;
  }],
  [3676426407, function() {
const result = { _: 'inputSecureValue' };
result.flags = this.int();
result.type = this.predicate();
if (result.flags & 1) result.data = this.predicate();
if (result.flags & 2) result.front_side = this.predicate();
if (result.flags & 4) result.reverse_side = this.predicate();
if (result.flags & 8) result.selfie = this.predicate();
if (result.flags & 64) result.translation = this.vector(this.predicate);
if (result.flags & 16) result.files = this.vector(this.predicate);
if (result.flags & 32) result.plain_data = this.predicate();
return result;
  }],
  [3978218928, function() {
const result = { _: 'secureValueHash' };
result.type = this.predicate();
result.hash = this.bytes();
return result;
  }],
  [3903065049, function() {
const result = { _: 'secureValueErrorData' };
result.type = this.predicate();
result.data_hash = this.bytes();
result.field = this.string();
result.text = this.string();
return result;
  }],
  [12467706, function() {
const result = { _: 'secureValueErrorFrontSide' };
result.type = this.predicate();
result.file_hash = this.bytes();
result.text = this.string();
return result;
  }],
  [2257201829, function() {
const result = { _: 'secureValueErrorReverseSide' };
result.type = this.predicate();
result.file_hash = this.bytes();
result.text = this.string();
return result;
  }],
  [3845639894, function() {
const result = { _: 'secureValueErrorSelfie' };
result.type = this.predicate();
result.file_hash = this.bytes();
result.text = this.string();
return result;
  }],
  [2054162547, function() {
const result = { _: 'secureValueErrorFile' };
result.type = this.predicate();
result.file_hash = this.bytes();
result.text = this.string();
return result;
  }],
  [1717706985, function() {
const result = { _: 'secureValueErrorFiles' };
result.type = this.predicate();
result.file_hash = this.vector(this.bytes, false);
result.text = this.string();
return result;
  }],
  [871426631, function() {
const result = { _: 'secureCredentialsEncrypted' };
result.data = this.bytes();
result.hash = this.bytes();
result.secret = this.bytes();
return result;
  }],
  [2905480408, function() {
const result = { _: 'account.authorizationForm' };
result.flags = this.int();
result.required_types = this.vector(this.predicate, false);
result.values = this.vector(this.predicate, false);
result.errors = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
if (result.flags & 1) result.privacy_policy_url = this.string();
return result;
  }],
  [2166326607, function() {
const result = { _: 'account.sentEmailCode' };
result.email_pattern = this.string();
result.length = this.int();
return result;
  }],
  [455635795, function() {
const result = { _: 'messageActionSecureValuesSentMe' };
result.values = this.vector(this.predicate, false);
result.credentials = this.predicate();
return result;
  }],
  [3646710100, function() {
const result = { _: 'messageActionSecureValuesSent' };
result.types = this.vector(this.predicate, false);
return result;
  }],
  [1722786150, function() {
const result = { _: 'help.deepLinkInfoEmpty' };
return result;
  }],
  [1783556146, function() {
const result = { _: 'help.deepLinkInfo' };
result.flags = this.int();
result.update_app = !!(result.flags & 1);
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
return result;
  }],
  [289586518, function() {
const result = { _: 'savedPhoneContact' };
result.phone = this.string();
result.first_name = this.string();
result.last_name = this.string();
result.date = this.int();
return result;
  }],
  [1304052993, function() {
const result = { _: 'account.takeout' };
result.id = this.long();
return result;
  }],
  [700340377, function() {
const result = { _: 'inputTakeoutFileLocation' };
return result;
  }],
  [3781450179, function() {
const result = { _: 'updateDialogUnreadMark' };
result.flags = this.int();
result.unread = !!(result.flags & 1);
result.peer = this.predicate();
return result;
  }],
  [4041467286, function() {
const result = { _: 'messages.dialogsNotModified' };
result.count = this.int();
return result;
  }],
  [2669814217, function() {
const result = { _: 'inputWebFileGeoPointLocation' };
result.geo_point = this.predicate();
result.access_hash = this.long();
result.w = this.int();
result.h = this.int();
result.zoom = this.int();
result.scale = this.int();
return result;
  }],
  [3039597469, function() {
const result = { _: 'contacts.topPeersDisabled' };
return result;
  }],
  [2609510714, function() {
const result = { _: 'inputReportReasonCopyright' };
return result;
  }],
  [3562713238, function() {
const result = { _: 'passwordKdfAlgoUnknown' };
return result;
  }],
  [4883767, function() {
const result = { _: 'securePasswordKdfAlgoUnknown' };
return result;
  }],
  [3153255840, function() {
const result = { _: 'securePasswordKdfAlgoPBKDF2HMACSHA512iter100000' };
result.salt = this.bytes();
return result;
  }],
  [2252807570, function() {
const result = { _: 'securePasswordKdfAlgoSHA512' };
result.salt = this.bytes();
return result;
  }],
  [354925740, function() {
const result = { _: 'secureSecretSettings' };
result.secure_algo = this.predicate();
result.secure_secret = this.bytes();
result.secure_secret_id = this.long();
return result;
  }],
  [982592842, function() {
const result = { _: 'passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow' };
result.salt1 = this.bytes();
result.salt2 = this.bytes();
result.g = this.int();
result.p = this.bytes();
return result;
  }],
  [2558588504, function() {
const result = { _: 'inputCheckPasswordEmpty' };
return result;
  }],
  [3531600002, function() {
const result = { _: 'inputCheckPasswordSRP' };
result.srp_id = this.long();
result.A = this.bytes();
result.M1 = this.bytes();
return result;
  }],
  [2258466191, function() {
const result = { _: 'secureValueError' };
result.type = this.predicate();
result.hash = this.bytes();
result.text = this.string();
return result;
  }],
  [2702460784, function() {
const result = { _: 'secureValueErrorTranslationFile' };
result.type = this.predicate();
result.file_hash = this.bytes();
result.text = this.string();
return result;
  }],
  [878931416, function() {
const result = { _: 'secureValueErrorTranslationFiles' };
result.type = this.predicate();
result.file_hash = this.vector(this.bytes, false);
result.text = this.string();
return result;
  }],
  [2191366618, function() {
const result = { _: 'secureRequiredType' };
result.flags = this.int();
result.native_names = !!(result.flags & 1);
result.selfie_required = !!(result.flags & 2);
result.translation_required = !!(result.flags & 4);
result.type = this.predicate();
return result;
  }],
  [41187252, function() {
const result = { _: 'secureRequiredTypeOneOf' };
result.types = this.vector(this.predicate, false);
return result;
  }],
  [3216634967, function() {
const result = { _: 'help.passportConfigNotModified' };
return result;
  }],
  [2694370991, function() {
const result = { _: 'help.passportConfig' };
result.hash = this.int();
result.countries_langs = this.predicate();
return result;
  }],
  [488313413, function() {
const result = { _: 'inputAppEvent' };
result.time = this.double();
result.type = this.string();
result.peer = this.long();
result.data = this.predicate();
return result;
  }],
  [3235781593, function() {
const result = { _: 'jsonObjectValue' };
result.key = this.string();
result.value = this.predicate();
return result;
  }],
  [1064139624, function() {
const result = { _: 'jsonNull' };
return result;
  }],
  [3342098026, function() {
const result = { _: 'jsonBool' };
result.value = this.predicate();
return result;
  }],
  [736157604, function() {
const result = { _: 'jsonNumber' };
result.value = this.double();
return result;
  }],
  [3072226938, function() {
const result = { _: 'jsonString' };
result.value = this.string();
return result;
  }],
  [4148447075, function() {
const result = { _: 'jsonArray' };
result.value = this.vector(this.predicate, false);
return result;
  }],
  [2579616925, function() {
const result = { _: 'jsonObject' };
result.value = this.vector(this.predicate, false);
return result;
  }],
  [2983951486, function() {
const result = { _: 'inputNotifyBroadcasts' };
return result;
  }],
  [3591563503, function() {
const result = { _: 'notifyBroadcasts' };
return result;
  }],
  [3983181060, function() {
const result = { _: 'textSubscript' };
result.text = this.predicate();
return result;
  }],
  [3355139585, function() {
const result = { _: 'textSuperscript' };
result.text = this.predicate();
return result;
  }],
  [55281185, function() {
const result = { _: 'textMarked' };
result.text = this.predicate();
return result;
  }],
  [483104362, function() {
const result = { _: 'textPhone' };
result.text = this.predicate();
result.phone = this.string();
return result;
  }],
  [136105807, function() {
const result = { _: 'textImage' };
result.document_id = this.long();
result.w = this.int();
result.h = this.int();
return result;
  }],
  [504660880, function() {
const result = { _: 'pageBlockKicker' };
result.text = this.predicate();
return result;
  }],
  [878078826, function() {
const result = { _: 'pageTableCell' };
result.flags = this.int();
result.header = !!(result.flags & 1);
result.align_center = !!(result.flags & 8);
result.align_right = !!(result.flags & 16);
result.valign_middle = !!(result.flags & 32);
result.valign_bottom = !!(result.flags & 64);
if (result.flags & 128) result.text = this.predicate();
if (result.flags & 2) result.colspan = this.int();
if (result.flags & 4) result.rowspan = this.int();
return result;
  }],
  [3770729957, function() {
const result = { _: 'pageTableRow' };
result.cells = this.vector(this.predicate, false);
return result;
  }],
  [3209554562, function() {
const result = { _: 'pageBlockTable' };
result.flags = this.int();
result.bordered = !!(result.flags & 1);
result.striped = !!(result.flags & 2);
result.title = this.predicate();
result.rows = this.vector(this.predicate, false);
return result;
  }],
  [1869903447, function() {
const result = { _: 'pageCaption' };
result.text = this.predicate();
result.credit = this.predicate();
return result;
  }],
  [3106911949, function() {
const result = { _: 'pageListItemText' };
result.text = this.predicate();
return result;
  }],
  [635466748, function() {
const result = { _: 'pageListItemBlocks' };
result.blocks = this.vector(this.predicate, false);
return result;
  }],
  [1577484359, function() {
const result = { _: 'pageListOrderedItemText' };
result.num = this.string();
result.text = this.predicate();
return result;
  }],
  [2564655414, function() {
const result = { _: 'pageListOrderedItemBlocks' };
result.num = this.string();
result.blocks = this.vector(this.predicate, false);
return result;
  }],
  [2592793057, function() {
const result = { _: 'pageBlockOrderedList' };
result.items = this.vector(this.predicate, false);
return result;
  }],
  [1987480557, function() {
const result = { _: 'pageBlockDetails' };
result.flags = this.int();
result.open = !!(result.flags & 1);
result.blocks = this.vector(this.predicate, false);
result.title = this.predicate();
return result;
  }],
  [3012615176, function() {
const result = { _: 'pageRelatedArticle' };
result.flags = this.int();
result.url = this.string();
result.webpage_id = this.long();
if (result.flags & 1) result.title = this.string();
if (result.flags & 2) result.description = this.string();
if (result.flags & 4) result.photo_id = this.long();
if (result.flags & 8) result.author = this.string();
if (result.flags & 16) result.published_date = this.int();
return result;
  }],
  [370236054, function() {
const result = { _: 'pageBlockRelatedArticles' };
result.title = this.predicate();
result.articles = this.vector(this.predicate, false);
return result;
  }],
  [2756656886, function() {
const result = { _: 'pageBlockMap' };
result.geo = this.predicate();
result.zoom = this.int();
result.w = this.int();
result.h = this.int();
result.caption = this.predicate();
return result;
  }],
  [2556788493, function() {
const result = { _: 'page' };
result.flags = this.int();
result.part = !!(result.flags & 1);
result.rtl = !!(result.flags & 2);
result.v2 = !!(result.flags & 4);
result.url = this.string();
result.blocks = this.vector(this.predicate, false);
result.photos = this.vector(this.predicate, false);
result.documents = this.vector(this.predicate, false);
if (result.flags & 8) result.views = this.int();
return result;
  }],
  [3684593874, function() {
const result = { _: 'inputPrivacyKeyPhoneP2P' };
return result;
  }],
  [961092808, function() {
const result = { _: 'privacyKeyPhoneP2P' };
return result;
  }],
  [894777186, function() {
const result = { _: 'textAnchor' };
result.text = this.predicate();
result.name = this.string();
return result;
  }],
  [2349199817, function() {
const result = { _: 'help.supportName' };
result.name = this.string();
return result;
  }],
  [4088278765, function() {
const result = { _: 'help.userInfoEmpty' };
return result;
  }],
  [32192344, function() {
const result = { _: 'help.userInfo' };
result.message = this.string();
result.entities = this.vector(this.predicate, false);
result.author = this.string();
result.date = this.int();
return result;
  }],
  [4092747638, function() {
const result = { _: 'messageActionContactSignUp' };
return result;
  }],
  [2896258427, function() {
const result = { _: 'updateMessagePoll' };
result.flags = this.int();
result.poll_id = this.long();
if (result.flags & 1) result.poll = this.predicate();
result.results = this.predicate();
return result;
  }],
  [1823064809, function() {
const result = { _: 'pollAnswer' };
result.text = this.string();
result.option = this.bytes();
return result;
  }],
  [2262925665, function() {
const result = { _: 'poll' };
result.id = this.long();
result.flags = this.int();
result.closed = !!(result.flags & 1);
result.public_voters = !!(result.flags & 2);
result.multiple_choice = !!(result.flags & 4);
result.quiz = !!(result.flags & 8);
result.question = this.string();
result.answers = this.vector(this.predicate, false);
if (result.flags & 16) result.close_period = this.int();
if (result.flags & 32) result.close_date = this.int();
return result;
  }],
  [997055186, function() {
const result = { _: 'pollAnswerVoters' };
result.flags = this.int();
result.chosen = !!(result.flags & 1);
result.correct = !!(result.flags & 2);
result.option = this.bytes();
result.voters = this.int();
return result;
  }],
  [2061444128, function() {
const result = { _: 'pollResults' };
result.flags = this.int();
result.min = !!(result.flags & 1);
if (result.flags & 2) result.results = this.vector(this.predicate);
if (result.flags & 4) result.total_voters = this.int();
if (result.flags & 8) result.recent_voters = this.vector(this.predicate);
if (result.flags & 16) result.solution = this.string();
if (result.flags & 16) result.solution_entities = this.vector(this.predicate);
return result;
  }],
  [261416433, function() {
const result = { _: 'inputMediaPoll' };
result.flags = this.int();
result.poll = this.predicate();
if (result.flags & 1) result.correct_answers = this.vector(this.bytes);
if (result.flags & 2) result.solution = this.string();
if (result.flags & 2) result.solution_entities = this.vector(this.predicate);
return result;
  }],
  [1272375192, function() {
const result = { _: 'messageMediaPoll' };
result.poll = this.predicate();
result.results = this.predicate();
return result;
  }],
  [4030849616, function() {
const result = { _: 'chatOnlines' };
result.onlines = this.int();
return result;
  }],
  [1202287072, function() {
const result = { _: 'statsURL' };
result.url = this.string();
return result;
  }],
  [3769678894, function() {
const result = { _: 'photoStrippedSize' };
result.type = this.string();
result.bytes = this.bytes();
return result;
  }],
  [1605510357, function() {
const result = { _: 'chatAdminRights' };
result.flags = this.int();
result.change_info = !!(result.flags & 1);
result.post_messages = !!(result.flags & 2);
result.edit_messages = !!(result.flags & 4);
result.delete_messages = !!(result.flags & 8);
result.ban_users = !!(result.flags & 16);
result.invite_users = !!(result.flags & 32);
result.pin_messages = !!(result.flags & 128);
result.add_admins = !!(result.flags & 512);
result.anonymous = !!(result.flags & 1024);
result.manage_call = !!(result.flags & 2048);
result.other = !!(result.flags & 4096);
result.manage_topics = !!(result.flags & 8192);
result.post_stories = !!(result.flags & 16384);
result.edit_stories = !!(result.flags & 32768);
result.delete_stories = !!(result.flags & 65536);
return result;
  }],
  [2668758040, function() {
const result = { _: 'chatBannedRights' };
result.flags = this.int();
result.view_messages = !!(result.flags & 1);
result.send_messages = !!(result.flags & 2);
result.send_media = !!(result.flags & 4);
result.send_stickers = !!(result.flags & 8);
result.send_gifs = !!(result.flags & 16);
result.send_games = !!(result.flags & 32);
result.send_inline = !!(result.flags & 64);
result.embed_links = !!(result.flags & 128);
result.send_polls = !!(result.flags & 256);
result.change_info = !!(result.flags & 1024);
result.invite_users = !!(result.flags & 32768);
result.pin_messages = !!(result.flags & 131072);
result.manage_topics = !!(result.flags & 262144);
result.send_photos = !!(result.flags & 524288);
result.send_videos = !!(result.flags & 1048576);
result.send_roundvideos = !!(result.flags & 2097152);
result.send_audios = !!(result.flags & 4194304);
result.send_voices = !!(result.flags & 8388608);
result.send_docs = !!(result.flags & 16777216);
result.send_plain = !!(result.flags & 33554432);
result.until_date = this.int();
return result;
  }],
  [1421875280, function() {
const result = { _: 'updateChatDefaultBannedRights' };
result.peer = this.predicate();
result.default_banned_rights = this.predicate();
result.version = this.int();
return result;
  }],
  [3861952889, function() {
const result = { _: 'inputWallPaper' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [1913199744, function() {
const result = { _: 'inputWallPaperSlug' };
result.slug = this.string();
return result;
  }],
  [3144345741, function() {
const result = { _: 'channelParticipantsContacts' };
result.q = this.string();
return result;
  }],
  [771095562, function() {
const result = { _: 'channelAdminLogEventActionDefaultBannedRights' };
result.prev_banned_rights = this.predicate();
result.new_banned_rights = this.predicate();
return result;
  }],
  [2399639107, function() {
const result = { _: 'channelAdminLogEventActionStopPoll' };
result.message = this.predicate();
return result;
  }],
  [471437699, function() {
const result = { _: 'account.wallPapersNotModified' };
return result;
  }],
  [3452142988, function() {
const result = { _: 'account.wallPapers' };
result.hash = this.long();
result.wallpapers = this.vector(this.predicate, false);
return result;
  }],
  [2904898936, function() {
const result = { _: 'codeSettings' };
result.flags = this.int();
result.allow_flashcall = !!(result.flags & 1);
result.current_number = !!(result.flags & 2);
result.allow_app_hash = !!(result.flags & 16);
result.allow_missed_call = !!(result.flags & 32);
result.allow_firebase = !!(result.flags & 128);
if (result.flags & 64) result.logout_tokens = this.vector(this.bytes);
if (result.flags & 256) result.token = this.string();
if (result.flags & 256) result.app_sandbox = this.predicate();
return result;
  }],
  [925826256, function() {
const result = { _: 'wallPaperSettings' };
result.flags = this.int();
result.blur = !!(result.flags & 2);
result.motion = !!(result.flags & 4);
if (result.flags & 1) result.background_color = this.int();
if (result.flags & 16) result.second_background_color = this.int();
if (result.flags & 32) result.third_background_color = this.int();
if (result.flags & 64) result.fourth_background_color = this.int();
if (result.flags & 8) result.intensity = this.int();
if (result.flags & 16) result.rotation = this.int();
if (result.flags & 128) result.emoticon = this.string();
return result;
  }],
  [3131405864, function() {
const result = { _: 'autoDownloadSettings' };
result.flags = this.int();
result.disabled = !!(result.flags & 1);
result.video_preload_large = !!(result.flags & 2);
result.audio_preload_next = !!(result.flags & 4);
result.phonecalls_less_data = !!(result.flags & 8);
result.stories_preload = !!(result.flags & 16);
result.photo_size_max = this.int();
result.video_size_max = this.long();
result.file_size_max = this.long();
result.video_upload_maxbitrate = this.int();
result.small_queue_active_operations_max = this.int();
result.large_queue_active_operations_max = this.int();
return result;
  }],
  [1674235686, function() {
const result = { _: 'account.autoDownloadSettings' };
result.low = this.predicate();
result.medium = this.predicate();
result.high = this.predicate();
return result;
  }],
  [3585325561, function() {
const result = { _: 'emojiKeyword' };
result.keyword = this.string();
result.emoticons = this.vector(this.string, false);
return result;
  }],
  [594408994, function() {
const result = { _: 'emojiKeywordDeleted' };
result.keyword = this.string();
result.emoticons = this.vector(this.string, false);
return result;
  }],
  [1556570557, function() {
const result = { _: 'emojiKeywordsDifference' };
result.lang_code = this.string();
result.from_version = this.int();
result.version = this.int();
result.keywords = this.vector(this.predicate, false);
return result;
  }],
  [2775937949, function() {
const result = { _: 'emojiURL' };
result.url = this.string();
return result;
  }],
  [3019592545, function() {
const result = { _: 'emojiLanguage' };
result.lang_code = this.string();
return result;
  }],
  [2765966344, function() {
const result = { _: 'inputPrivacyKeyForwards' };
return result;
  }],
  [1777096355, function() {
const result = { _: 'privacyKeyForwards' };
return result;
  }],
  [1461304012, function() {
const result = { _: 'inputPrivacyKeyProfilePhoto' };
return result;
  }],
  [2517966829, function() {
const result = { _: 'privacyKeyProfilePhoto' };
return result;
  }],
  [1075322878, function() {
const result = { _: 'inputPhotoFileLocation' };
result.id = this.long();
result.access_hash = this.long();
result.file_reference = this.bytes();
result.thumb_size = this.string();
return result;
  }],
  [3627312883, function() {
const result = { _: 'inputPhotoLegacyFileLocation' };
result.id = this.long();
result.access_hash = this.long();
result.file_reference = this.bytes();
result.volume_id = this.long();
result.local_id = this.int();
result.secret = this.long();
return result;
  }],
  [925204121, function() {
const result = { _: 'inputPeerPhotoFileLocation' };
result.flags = this.int();
result.big = !!(result.flags & 1);
result.peer = this.predicate();
result.photo_id = this.long();
return result;
  }],
  [2642736091, function() {
const result = { _: 'inputStickerSetThumb' };
result.stickerset = this.predicate();
result.thumb_version = this.int();
return result;
  }],
  [4283715173, function() {
const result = { _: 'folder' };
result.flags = this.int();
result.autofill_new_broadcasts = !!(result.flags & 1);
result.autofill_public_groups = !!(result.flags & 2);
result.autofill_new_correspondents = !!(result.flags & 4);
result.id = this.int();
result.title = this.string();
if (result.flags & 8) result.photo = this.predicate();
return result;
  }],
  [1908216652, function() {
const result = { _: 'dialogFolder' };
result.flags = this.int();
result.pinned = !!(result.flags & 4);
result.folder = this.predicate();
result.peer = this.predicate();
result.top_message = this.int();
result.unread_muted_peers_count = this.int();
result.unread_unmuted_peers_count = this.int();
result.unread_muted_messages_count = this.int();
result.unread_unmuted_messages_count = this.int();
return result;
  }],
  [1684014375, function() {
const result = { _: 'inputDialogPeerFolder' };
result.folder_id = this.int();
return result;
  }],
  [1363483106, function() {
const result = { _: 'dialogPeerFolder' };
result.folder_id = this.int();
return result;
  }],
  [4224893590, function() {
const result = { _: 'inputFolderPeer' };
result.peer = this.predicate();
result.folder_id = this.int();
return result;
  }],
  [3921323624, function() {
const result = { _: 'folderPeer' };
result.peer = this.predicate();
result.folder_id = this.int();
return result;
  }],
  [422972864, function() {
const result = { _: 'updateFolderPeers' };
result.folder_peers = this.vector(this.predicate, false);
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [497305826, function() {
const result = { _: 'inputUserFromMessage' };
result.peer = this.predicate();
result.msg_id = this.int();
result.user_id = this.long();
return result;
  }],
  [1536380829, function() {
const result = { _: 'inputChannelFromMessage' };
result.peer = this.predicate();
result.msg_id = this.int();
result.channel_id = this.long();
return result;
  }],
  [2826635804, function() {
const result = { _: 'inputPeerUserFromMessage' };
result.peer = this.predicate();
result.msg_id = this.int();
result.user_id = this.long();
return result;
  }],
  [3173648448, function() {
const result = { _: 'inputPeerChannelFromMessage' };
result.peer = this.predicate();
result.msg_id = this.int();
result.channel_id = this.long();
return result;
  }],
  [55761658, function() {
const result = { _: 'inputPrivacyKeyPhoneNumber' };
return result;
  }],
  [3516589165, function() {
const result = { _: 'privacyKeyPhoneNumber' };
return result;
  }],
  [2822794409, function() {
const result = { _: 'topPeerCategoryForwardUsers' };
return result;
  }],
  [4226728176, function() {
const result = { _: 'topPeerCategoryForwardChats' };
return result;
  }],
  [84703944, function() {
const result = { _: 'channelAdminLogEventActionChangeLinkedChat' };
result.prev_value = this.long();
result.new_value = this.long();
return result;
  }],
  [3896830975, function() {
const result = { _: 'messages.searchCounter' };
result.flags = this.int();
result.inexact = !!(result.flags & 2);
result.filter = this.predicate();
result.count = this.int();
return result;
  }],
  [280464681, function() {
const result = { _: 'keyboardButtonUrlAuth' };
result.flags = this.int();
result.text = this.string();
if (result.flags & 1) result.fwd_text = this.string();
result.url = this.string();
result.button_id = this.int();
return result;
  }],
  [3492708308, function() {
const result = { _: 'inputKeyboardButtonUrlAuth' };
result.flags = this.int();
result.request_write_access = !!(result.flags & 1);
result.text = this.string();
if (result.flags & 2) result.fwd_text = this.string();
result.url = this.string();
result.bot = this.predicate();
return result;
  }],
  [2463316494, function() {
const result = { _: 'urlAuthResultRequest' };
result.flags = this.int();
result.request_write_access = !!(result.flags & 1);
result.bot = this.predicate();
result.domain = this.string();
return result;
  }],
  [2408320590, function() {
const result = { _: 'urlAuthResultAccepted' };
result.url = this.string();
return result;
  }],
  [2849430303, function() {
const result = { _: 'urlAuthResultDefault' };
return result;
  }],
  [2215004623, function() {
const result = { _: 'inputPrivacyValueAllowChatParticipants' };
result.chats = this.vector(this.long, false);
return result;
  }],
  [3914272646, function() {
const result = { _: 'inputPrivacyValueDisallowChatParticipants' };
result.chats = this.vector(this.long, false);
return result;
  }],
  [1796427406, function() {
const result = { _: 'privacyValueAllowChatParticipants' };
result.chats = this.vector(this.long, false);
return result;
  }],
  [1103656293, function() {
const result = { _: 'privacyValueDisallowChatParticipants' };
result.chats = this.vector(this.long, false);
return result;
  }],
  [2622389899, function() {
const result = { _: 'messageEntityUnderline' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [3204879316, function() {
const result = { _: 'messageEntityStrike' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [1786671974, function() {
const result = { _: 'updatePeerSettings' };
result.peer = this.predicate();
result.settings = this.predicate();
return result;
  }],
  [3216354699, function() {
const result = { _: 'channelLocationEmpty' };
return result;
  }],
  [547062491, function() {
const result = { _: 'channelLocation' };
result.geo_point = this.predicate();
result.address = this.string();
return result;
  }],
  [3393592157, function() {
const result = { _: 'peerLocated' };
result.peer = this.predicate();
result.expires = this.int();
result.distance = this.int();
return result;
  }],
  [3031420848, function() {
const result = { _: 'updatePeerLocated' };
result.peers = this.vector(this.predicate, false);
return result;
  }],
  [241923758, function() {
const result = { _: 'channelAdminLogEventActionChangeLocation' };
result.prev_value = this.predicate();
result.new_value = this.predicate();
return result;
  }],
  [3688169197, function() {
const result = { _: 'inputReportReasonGeoIrrelevant' };
return result;
  }],
  [1401984889, function() {
const result = { _: 'channelAdminLogEventActionToggleSlowMode' };
result.prev_value = this.int();
result.new_value = this.int();
return result;
  }],
  [1148485274, function() {
const result = { _: 'auth.authorizationSignUpRequired' };
result.flags = this.int();
if (result.flags & 1) result.terms_of_service = this.predicate();
return result;
  }],
  [3628142905, function() {
const result = { _: 'payments.paymentVerificationNeeded' };
result.url = this.string();
return result;
  }],
  [42402760, function() {
const result = { _: 'inputStickerSetAnimatedEmoji' };
return result;
  }],
  [967122427, function() {
const result = { _: 'updateNewScheduledMessage' };
result.message = this.predicate();
return result;
  }],
  [2424728814, function() {
const result = { _: 'updateDeleteScheduledMessages' };
result.peer = this.predicate();
result.messages = this.vector(this.int, false);
return result;
  }],
  [3497176244, function() {
const result = { _: 'restrictionReason' };
result.platform = this.string();
result.reason = this.string();
result.text = this.string();
return result;
  }],
  [1012306921, function() {
const result = { _: 'inputTheme' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [4119399921, function() {
const result = { _: 'inputThemeSlug' };
result.slug = this.string();
return result;
  }],
  [2685298646, function() {
const result = { _: 'theme' };
result.flags = this.int();
result.creator = !!(result.flags & 1);
result.default = !!(result.flags & 2);
result.for_chat = !!(result.flags & 32);
result.id = this.long();
result.access_hash = this.long();
result.slug = this.string();
result.title = this.string();
if (result.flags & 4) result.document = this.predicate();
if (result.flags & 8) result.settings = this.vector(this.predicate);
if (result.flags & 64) result.emoticon = this.string();
if (result.flags & 16) result.installs_count = this.int();
return result;
  }],
  [4095653410, function() {
const result = { _: 'account.themesNotModified' };
return result;
  }],
  [2587724909, function() {
const result = { _: 'account.themes' };
result.hash = this.long();
result.themes = this.vector(this.predicate, false);
return result;
  }],
  [2182544291, function() {
const result = { _: 'updateTheme' };
result.theme = this.predicate();
return result;
  }],
  [3508640733, function() {
const result = { _: 'inputPrivacyKeyAddedByPhone' };
return result;
  }],
  [1124062251, function() {
const result = { _: 'privacyKeyAddedByPhone' };
return result;
  }],
  [2267003193, function() {
const result = { _: 'updateGeoLiveViewed' };
result.peer = this.predicate();
result.msg_id = this.int();
return result;
  }],
  [1448076945, function() {
const result = { _: 'updateLoginToken' };
return result;
  }],
  [1654593920, function() {
const result = { _: 'auth.loginToken' };
result.expires = this.int();
result.token = this.bytes();
return result;
  }],
  [110008598, function() {
const result = { _: 'auth.loginTokenMigrateTo' };
result.dc_id = this.int();
result.token = this.bytes();
return result;
  }],
  [957176926, function() {
const result = { _: 'auth.loginTokenSuccess' };
result.authorization = this.predicate();
return result;
  }],
  [1474462241, function() {
const result = { _: 'account.contentSettings' };
result.flags = this.int();
result.sensitive_enabled = !!(result.flags & 1);
result.sensitive_can_change = !!(result.flags & 2);
return result;
  }],
  [2837970629, function() {
const result = { _: 'messages.inactiveChats' };
result.dates = this.vector(this.int, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3282117730, function() {
const result = { _: 'baseThemeClassic' };
return result;
  }],
  [4225242760, function() {
const result = { _: 'baseThemeDay' };
return result;
  }],
  [3081969320, function() {
const result = { _: 'baseThemeNight' };
return result;
  }],
  [1834973166, function() {
const result = { _: 'baseThemeTinted' };
return result;
  }],
  [1527845466, function() {
const result = { _: 'baseThemeArctic' };
return result;
  }],
  [2524595758, function() {
const result = { _: 'inputWallPaperNoFile' };
result.id = this.long();
return result;
  }],
  [3766501654, function() {
const result = { _: 'wallPaperNoFile' };
result.id = this.long();
result.flags = this.int();
result.default = !!(result.flags & 2);
result.dark = !!(result.flags & 16);
if (result.flags & 4) result.settings = this.predicate();
return result;
  }],
  [2413711439, function() {
const result = { _: 'inputThemeSettings' };
result.flags = this.int();
result.message_colors_animated = !!(result.flags & 4);
result.base_theme = this.predicate();
result.accent_color = this.int();
if (result.flags & 8) result.outbox_accent_color = this.int();
if (result.flags & 1) result.message_colors = this.vector(this.int);
if (result.flags & 2) result.wallpaper = this.predicate();
if (result.flags & 2) result.wallpaper_settings = this.predicate();
return result;
  }],
  [4200117972, function() {
const result = { _: 'themeSettings' };
result.flags = this.int();
result.message_colors_animated = !!(result.flags & 4);
result.base_theme = this.predicate();
result.accent_color = this.int();
if (result.flags & 8) result.outbox_accent_color = this.int();
if (result.flags & 1) result.message_colors = this.vector(this.int);
if (result.flags & 2) result.wallpaper = this.predicate();
return result;
  }],
  [1421174295, function() {
const result = { _: 'webPageAttributeTheme' };
result.flags = this.int();
if (result.flags & 1) result.documents = this.vector(this.predicate);
if (result.flags & 2) result.settings = this.predicate();
return result;
  }],
  [619974263, function() {
const result = { _: 'updateMessagePollVote' };
result.poll_id = this.long();
result.peer = this.predicate();
result.options = this.vector(this.bytes, false);
result.qts = this.int();
return result;
  }],
  [1218005070, function() {
const result = { _: 'messages.votesList' };
result.flags = this.int();
result.count = this.int();
result.votes = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
if (result.flags & 1) result.next_offset = this.string();
return result;
  }],
  [3150401885, function() {
const result = { _: 'keyboardButtonRequestPoll' };
result.flags = this.int();
if (result.flags & 1) result.quiz = this.predicate();
result.text = this.string();
return result;
  }],
  [1981704948, function() {
const result = { _: 'messageEntityBankCard' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [4117234314, function() {
const result = { _: 'bankCardOpenUrl' };
result.url = this.string();
result.name = this.string();
return result;
  }],
  [1042605427, function() {
const result = { _: 'payments.bankCardData' };
result.title = this.string();
result.open_urls = this.vector(this.predicate, false);
return result;
  }],
  [4176226379, function() {
const result = { _: 'peerSelfLocated' };
result.expires = this.int();
return result;
  }],
  [1949890536, function() {
const result = { _: 'dialogFilter' };
result.flags = this.int();
result.contacts = !!(result.flags & 1);
result.non_contacts = !!(result.flags & 2);
result.groups = !!(result.flags & 4);
result.broadcasts = !!(result.flags & 8);
result.bots = !!(result.flags & 16);
result.exclude_muted = !!(result.flags & 2048);
result.exclude_read = !!(result.flags & 4096);
result.exclude_archived = !!(result.flags & 8192);
result.id = this.int();
result.title = this.string();
if (result.flags & 33554432) result.emoticon = this.string();
result.pinned_peers = this.vector(this.predicate, false);
result.include_peers = this.vector(this.predicate, false);
result.exclude_peers = this.vector(this.predicate, false);
return result;
  }],
  [2004110666, function() {
const result = { _: 'dialogFilterSuggested' };
result.filter = this.predicate();
result.description = this.string();
return result;
  }],
  [654302845, function() {
const result = { _: 'updateDialogFilter' };
result.flags = this.int();
result.id = this.int();
if (result.flags & 1) result.filter = this.predicate();
return result;
  }],
  [2782339333, function() {
const result = { _: 'updateDialogFilterOrder' };
result.order = this.vector(this.int, false);
return result;
  }],
  [889491791, function() {
const result = { _: 'updateDialogFilters' };
return result;
  }],
  [3057118639, function() {
const result = { _: 'statsDateRangeDays' };
result.min_date = this.int();
result.max_date = this.int();
return result;
  }],
  [3410210014, function() {
const result = { _: 'statsAbsValueAndPrev' };
result.current = this.double();
result.previous = this.double();
return result;
  }],
  [3419287520, function() {
const result = { _: 'statsPercentValue' };
result.part = this.double();
result.total = this.double();
return result;
  }],
  [1244130093, function() {
const result = { _: 'statsGraphAsync' };
result.token = this.string();
return result;
  }],
  [3202127906, function() {
const result = { _: 'statsGraphError' };
result.error = this.string();
return result;
  }],
  [2393138358, function() {
const result = { _: 'statsGraph' };
result.flags = this.int();
result.json = this.predicate();
if (result.flags & 1) result.zoom_token = this.string();
return result;
  }],
  [963421692, function() {
const result = { _: 'stats.broadcastStats' };
result.period = this.predicate();
result.followers = this.predicate();
result.views_per_post = this.predicate();
result.shares_per_post = this.predicate();
result.reactions_per_post = this.predicate();
result.views_per_story = this.predicate();
result.shares_per_story = this.predicate();
result.reactions_per_story = this.predicate();
result.enabled_notifications = this.predicate();
result.growth_graph = this.predicate();
result.followers_graph = this.predicate();
result.mute_graph = this.predicate();
result.top_hours_graph = this.predicate();
result.interactions_graph = this.predicate();
result.iv_interactions_graph = this.predicate();
result.views_by_source_graph = this.predicate();
result.new_followers_by_source_graph = this.predicate();
result.languages_graph = this.predicate();
result.reactions_by_emotion_graph = this.predicate();
result.story_interactions_graph = this.predicate();
result.story_reactions_by_emotion_graph = this.predicate();
result.recent_posts_interactions = this.vector(this.predicate, false);
return result;
  }],
  [3866083195, function() {
const result = { _: 'inputMediaDice' };
result.emoticon = this.string();
return result;
  }],
  [1065280907, function() {
const result = { _: 'messageMediaDice' };
result.value = this.int();
result.emoticon = this.string();
return result;
  }],
  [3867103758, function() {
const result = { _: 'inputStickerSetDice' };
result.emoticon = this.string();
return result;
  }],
  [2566302837, function() {
const result = { _: 'help.promoDataEmpty' };
result.expires = this.int();
return result;
  }],
  [2352576831, function() {
const result = { _: 'help.promoData' };
result.flags = this.int();
result.proxy = !!(result.flags & 1);
result.expires = this.int();
result.peer = this.predicate();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
if (result.flags & 2) result.psa_type = this.string();
if (result.flags & 4) result.psa_message = this.string();
return result;
  }],
  [3727929492, function() {
const result = { _: 'videoSize' };
result.flags = this.int();
result.type = this.string();
result.w = this.int();
result.h = this.int();
result.size = this.int();
if (result.flags & 1) result.video_start_ts = this.double();
return result;
  }],
  [643940105, function() {
const result = { _: 'updatePhoneCallSignalingData' };
result.phone_call_id = this.long();
result.data = this.bytes();
return result;
  }],
  [1634294960, function() {
const result = { _: 'chatInvitePeek' };
result.chat = this.predicate();
result.expires = this.int();
return result;
  }],
  [2634330011, function() {
const result = { _: 'statsGroupTopPoster' };
result.user_id = this.long();
result.messages = this.int();
result.avg_chars = this.int();
return result;
  }],
  [3612888199, function() {
const result = { _: 'statsGroupTopAdmin' };
result.user_id = this.long();
result.deleted = this.int();
result.kicked = this.int();
result.banned = this.int();
return result;
  }],
  [1398765469, function() {
const result = { _: 'statsGroupTopInviter' };
result.user_id = this.long();
result.invitations = this.int();
return result;
  }],
  [4018141462, function() {
const result = { _: 'stats.megagroupStats' };
result.period = this.predicate();
result.members = this.predicate();
result.messages = this.predicate();
result.viewers = this.predicate();
result.posters = this.predicate();
result.growth_graph = this.predicate();
result.members_graph = this.predicate();
result.new_members_by_source_graph = this.predicate();
result.languages_graph = this.predicate();
result.messages_graph = this.predicate();
result.actions_graph = this.predicate();
result.top_hours_graph = this.predicate();
result.weekdays_graph = this.predicate();
result.top_posters = this.vector(this.predicate, false);
result.top_admins = this.vector(this.predicate, false);
result.top_inviters = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1934380235, function() {
const result = { _: 'globalPrivacySettings' };
result.flags = this.int();
result.archive_and_mute_new_noncontact_peers = !!(result.flags & 1);
result.keep_archived_unmuted = !!(result.flags & 2);
result.keep_archived_folders = !!(result.flags & 4);
return result;
  }],
  [1667228533, function() {
const result = { _: 'phoneConnectionWebrtc' };
result.flags = this.int();
result.turn = !!(result.flags & 1);
result.stun = !!(result.flags & 2);
result.id = this.long();
result.ip = this.string();
result.ipv6 = this.string();
result.port = this.int();
result.username = this.string();
result.password = this.string();
return result;
  }],
  [1107543535, function() {
const result = { _: 'help.countryCode' };
result.flags = this.int();
result.country_code = this.string();
if (result.flags & 1) result.prefixes = this.vector(this.string);
if (result.flags & 2) result.patterns = this.vector(this.string);
return result;
  }],
  [3280440867, function() {
const result = { _: 'help.country' };
result.flags = this.int();
result.hidden = !!(result.flags & 1);
result.iso2 = this.string();
result.default_name = this.string();
if (result.flags & 2) result.name = this.string();
result.country_codes = this.vector(this.predicate, false);
return result;
  }],
  [2479628082, function() {
const result = { _: 'help.countriesListNotModified' };
return result;
  }],
  [2278585758, function() {
const result = { _: 'help.countriesList' };
result.countries = this.vector(this.predicate, false);
result.hash = this.int();
return result;
  }],
  [1163625789, function() {
const result = { _: 'messageViews' };
result.flags = this.int();
if (result.flags & 1) result.views = this.int();
if (result.flags & 2) result.forwards = this.int();
if (result.flags & 4) result.replies = this.predicate();
return result;
  }],
  [3533318132, function() {
const result = { _: 'updateChannelMessageForwards' };
result.channel_id = this.long();
result.id = this.int();
result.forwards = this.int();
return result;
  }],
  [4198431637, function() {
const result = { _: 'photoSizeProgressive' };
result.type = this.string();
result.w = this.int();
result.h = this.int();
result.sizes = this.vector(this.int, false);
return result;
  }],
  [3066361155, function() {
const result = { _: 'messages.messageViews' };
result.views = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3601962310, function() {
const result = { _: 'updateReadChannelDiscussionInbox' };
result.flags = this.int();
result.channel_id = this.long();
result.top_msg_id = this.int();
result.read_max_id = this.int();
if (result.flags & 1) result.broadcast_id = this.long();
if (result.flags & 1) result.broadcast_post = this.int();
return result;
  }],
  [1767677564, function() {
const result = { _: 'updateReadChannelDiscussionOutbox' };
result.channel_id = this.long();
result.top_msg_id = this.int();
result.read_max_id = this.int();
return result;
  }],
  [2788431746, function() {
const result = { _: 'messages.discussionMessage' };
result.flags = this.int();
result.messages = this.vector(this.predicate, false);
if (result.flags & 1) result.max_id = this.int();
if (result.flags & 2) result.read_inbox_max_id = this.int();
if (result.flags & 4) result.read_outbox_max_id = this.int();
result.unread_count = this.int();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2948336091, function() {
const result = { _: 'messageReplyHeader' };
result.flags = this.int();
result.reply_to_scheduled = !!(result.flags & 4);
result.forum_topic = !!(result.flags & 8);
result.quote = !!(result.flags & 512);
if (result.flags & 16) result.reply_to_msg_id = this.int();
if (result.flags & 1) result.reply_to_peer_id = this.predicate();
if (result.flags & 32) result.reply_from = this.predicate();
if (result.flags & 256) result.reply_media = this.predicate();
if (result.flags & 2) result.reply_to_top_id = this.int();
if (result.flags & 64) result.quote_text = this.string();
if (result.flags & 128) result.quote_entities = this.vector(this.predicate);
if (result.flags & 1024) result.quote_offset = this.int();
return result;
  }],
  [2211844034, function() {
const result = { _: 'messageReplies' };
result.flags = this.int();
result.comments = !!(result.flags & 1);
result.replies = this.int();
result.replies_pts = this.int();
if (result.flags & 2) result.recent_repliers = this.vector(this.predicate);
if (result.flags & 1) result.channel_id = this.long();
if (result.flags & 4) result.max_id = this.int();
if (result.flags & 8) result.read_max_id = this.int();
return result;
  }],
  [3957356370, function() {
const result = { _: 'updatePeerBlocked' };
result.flags = this.int();
result.blocked = !!(result.flags & 1);
result.blocked_my_stories_from = !!(result.flags & 2);
result.peer_id = this.predicate();
return result;
  }],
  [3908927508, function() {
const result = { _: 'peerBlocked' };
result.peer_id = this.predicate();
result.date = this.int();
return result;
  }],
  [2357774627, function() {
const result = { _: 'updateChannelUserTyping' };
result.flags = this.int();
result.channel_id = this.long();
if (result.flags & 1) result.top_msg_id = this.int();
result.from_id = this.predicate();
result.action = this.predicate();
return result;
  }],
  [2902071934, function() {
const result = { _: 'inputMessageCallbackQuery' };
result.id = this.int();
result.query_id = this.long();
return result;
  }],
  [453242886, function() {
const result = { _: 'channelParticipantLeft' };
result.peer = this.predicate();
return result;
  }],
  [3763035371, function() {
const result = { _: 'channelParticipantsMentions' };
result.flags = this.int();
if (result.flags & 1) result.q = this.string();
if (result.flags & 2) result.top_msg_id = this.int();
return result;
  }],
  [3984976565, function() {
const result = { _: 'updatePinnedMessages' };
result.flags = this.int();
result.pinned = !!(result.flags & 1);
result.peer = this.predicate();
result.messages = this.vector(this.int, false);
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [1538885128, function() {
const result = { _: 'updatePinnedChannelMessages' };
result.flags = this.int();
result.pinned = !!(result.flags & 1);
result.channel_id = this.long();
result.messages = this.vector(this.int, false);
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [464520273, function() {
const result = { _: 'inputMessagesFilterPinned' };
return result;
  }],
  [2145983508, function() {
const result = { _: 'stats.messageStats' };
result.views_graph = this.predicate();
result.reactions_by_emotion_graph = this.predicate();
return result;
  }],
  [2564871831, function() {
const result = { _: 'messageActionGeoProximityReached' };
result.from_id = this.predicate();
result.to_id = this.predicate();
result.distance = this.int();
return result;
  }],
  [3626061121, function() {
const result = { _: 'photoPathSize' };
result.type = this.string();
result.bytes = this.bytes();
return result;
  }],
  [3643548293, function() {
const result = { _: 'speakingInGroupCallAction' };
return result;
  }],
  [2004925620, function() {
const result = { _: 'groupCallDiscarded' };
result.id = this.long();
result.access_hash = this.long();
result.duration = this.int();
return result;
  }],
  [3583468812, function() {
const result = { _: 'groupCall' };
result.flags = this.int();
result.join_muted = !!(result.flags & 2);
result.can_change_join_muted = !!(result.flags & 4);
result.join_date_asc = !!(result.flags & 64);
result.schedule_start_subscribed = !!(result.flags & 256);
result.can_start_video = !!(result.flags & 512);
result.record_video_active = !!(result.flags & 2048);
result.rtmp_stream = !!(result.flags & 4096);
result.listeners_hidden = !!(result.flags & 8192);
result.id = this.long();
result.access_hash = this.long();
result.participants_count = this.int();
if (result.flags & 8) result.title = this.string();
if (result.flags & 16) result.stream_dc_id = this.int();
if (result.flags & 32) result.record_start_date = this.int();
if (result.flags & 128) result.schedule_date = this.int();
if (result.flags & 1024) result.unmuted_video_count = this.int();
result.unmuted_video_limit = this.int();
result.version = this.int();
return result;
  }],
  [3635053583, function() {
const result = { _: 'inputGroupCall' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [2047704898, function() {
const result = { _: 'messageActionGroupCall' };
result.flags = this.int();
result.call = this.predicate();
if (result.flags & 1) result.duration = this.int();
return result;
  }],
  [1345295095, function() {
const result = { _: 'messageActionInviteToGroupCall' };
result.call = this.predicate();
result.users = this.vector(this.long, false);
return result;
  }],
  [3953538814, function() {
const result = { _: 'groupCallParticipant' };
result.flags = this.int();
result.muted = !!(result.flags & 1);
result.left = !!(result.flags & 2);
result.can_self_unmute = !!(result.flags & 4);
result.just_joined = !!(result.flags & 16);
result.versioned = !!(result.flags & 32);
result.min = !!(result.flags & 256);
result.muted_by_you = !!(result.flags & 512);
result.volume_by_admin = !!(result.flags & 1024);
result.self = !!(result.flags & 4096);
result.video_joined = !!(result.flags & 32768);
result.peer = this.predicate();
result.date = this.int();
if (result.flags & 8) result.active_date = this.int();
result.source = this.int();
if (result.flags & 128) result.volume = this.int();
if (result.flags & 2048) result.about = this.string();
if (result.flags & 8192) result.raise_hand_rating = this.long();
if (result.flags & 64) result.video = this.predicate();
if (result.flags & 16384) result.presentation = this.predicate();
return result;
  }],
  [4170869326, function() {
const result = { _: 'updateChat' };
result.chat_id = this.long();
return result;
  }],
  [4075543374, function() {
const result = { _: 'updateGroupCallParticipants' };
result.call = this.predicate();
result.participants = this.vector(this.predicate, false);
result.version = this.int();
return result;
  }],
  [347227392, function() {
const result = { _: 'updateGroupCall' };
result.chat_id = this.long();
result.call = this.predicate();
return result;
  }],
  [2658302637, function() {
const result = { _: 'phone.groupCall' };
result.call = this.predicate();
result.participants = this.vector(this.predicate, false);
result.participants_next_offset = this.string();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [4101460406, function() {
const result = { _: 'phone.groupParticipants' };
result.count = this.int();
result.participants = this.vector(this.predicate, false);
result.next_offset = this.string();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
result.version = this.int();
return result;
  }],
  [813821341, function() {
const result = { _: 'inlineQueryPeerTypeSameBotPM' };
return result;
  }],
  [2201751468, function() {
const result = { _: 'inlineQueryPeerTypePM' };
return result;
  }],
  [3613836554, function() {
const result = { _: 'inlineQueryPeerTypeChat' };
return result;
  }],
  [1589952067, function() {
const result = { _: 'inlineQueryPeerTypeMegagroup' };
return result;
  }],
  [1664413338, function() {
const result = { _: 'inlineQueryPeerTypeBroadcast' };
return result;
  }],
  [589338437, function() {
const result = { _: 'channelAdminLogEventActionStartGroupCall' };
result.call = this.predicate();
return result;
  }],
  [3684667712, function() {
const result = { _: 'channelAdminLogEventActionDiscardGroupCall' };
result.call = this.predicate();
return result;
  }],
  [4179895506, function() {
const result = { _: 'channelAdminLogEventActionParticipantMute' };
result.participant = this.predicate();
return result;
  }],
  [3863226816, function() {
const result = { _: 'channelAdminLogEventActionParticipantUnmute' };
result.participant = this.predicate();
return result;
  }],
  [1456906823, function() {
const result = { _: 'channelAdminLogEventActionToggleGroupCallSetting' };
result.join_muted = this.predicate();
return result;
  }],
  [2328045569, function() {
const result = { _: 'inputPaymentCredentialsGooglePay' };
result.payment_token = this.predicate();
return result;
  }],
  [375566091, function() {
const result = { _: 'messages.historyImport' };
result.id = this.long();
return result;
  }],
  [3688534598, function() {
const result = { _: 'sendMessageHistoryImportAction' };
result.progress = this.int();
return result;
  }],
  [1578088377, function() {
const result = { _: 'messages.historyImportParsed' };
result.flags = this.int();
result.pm = !!(result.flags & 1);
result.group = !!(result.flags & 2);
if (result.flags & 4) result.title = this.string();
return result;
  }],
  [4124956391, function() {
const result = { _: 'inputReportReasonFake' };
return result;
  }],
  [4019011180, function() {
const result = { _: 'messages.affectedFoundMessages' };
result.pts = this.int();
result.pts_count = this.int();
result.offset = this.int();
result.messages = this.vector(this.int, false);
return result;
  }],
  [1007897979, function() {
const result = { _: 'messageActionSetMessagesTTL' };
result.flags = this.int();
result.period = this.int();
if (result.flags & 1) result.auto_setting_from = this.long();
return result;
  }],
  [3147544997, function() {
const result = { _: 'updatePeerHistoryTTL' };
result.flags = this.int();
result.peer = this.predicate();
if (result.flags & 1) result.ttl_period = this.int();
return result;
  }],
  [3498534458, function() {
const result = { _: 'updateChatParticipant' };
result.flags = this.int();
result.chat_id = this.long();
result.date = this.int();
result.actor_id = this.long();
result.user_id = this.long();
if (result.flags & 1) result.prev_participant = this.predicate();
if (result.flags & 2) result.new_participant = this.predicate();
if (result.flags & 4) result.invite = this.predicate();
result.qts = this.int();
return result;
  }],
  [2556246715, function() {
const result = { _: 'updateChannelParticipant' };
result.flags = this.int();
result.via_chatlist = !!(result.flags & 8);
result.channel_id = this.long();
result.date = this.int();
result.actor_id = this.long();
result.user_id = this.long();
if (result.flags & 1) result.prev_participant = this.predicate();
if (result.flags & 2) result.new_participant = this.predicate();
if (result.flags & 4) result.invite = this.predicate();
result.qts = this.int();
return result;
  }],
  [3297184329, function() {
const result = { _: 'updateBotStopped' };
result.user_id = this.long();
result.date = this.int();
result.stopped = this.predicate();
result.qts = this.int();
return result;
  }],
  [2354765785, function() {
const result = { _: 'chatInviteImporter' };
result.flags = this.int();
result.requested = !!(result.flags & 1);
result.via_chatlist = !!(result.flags & 8);
result.user_id = this.long();
result.date = this.int();
if (result.flags & 4) result.about = this.string();
if (result.flags & 2) result.approved_by = this.long();
return result;
  }],
  [3183881676, function() {
const result = { _: 'messages.exportedChatInvites' };
result.count = this.int();
result.invites = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [410107472, function() {
const result = { _: 'messages.exportedChatInvite' };
result.invite = this.predicate();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [572915951, function() {
const result = { _: 'messages.exportedChatInviteReplaced' };
result.invite = this.predicate();
result.new_invite = this.predicate();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2176233482, function() {
const result = { _: 'messages.chatInviteImporters' };
result.count = this.int();
result.importers = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [4075613987, function() {
const result = { _: 'chatAdminWithInvites' };
result.admin_id = this.long();
result.invites_count = this.int();
result.revoked_invites_count = this.int();
return result;
  }],
  [3063640791, function() {
const result = { _: 'messages.chatAdminsWithInvites' };
result.admins = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [4271882584, function() {
const result = { _: 'channelAdminLogEventActionParticipantJoinByInvite' };
result.flags = this.int();
result.via_chatlist = !!(result.flags & 1);
result.invite = this.predicate();
return result;
  }],
  [1515256996, function() {
const result = { _: 'channelAdminLogEventActionExportedInviteDelete' };
result.invite = this.predicate();
return result;
  }],
  [1091179342, function() {
const result = { _: 'channelAdminLogEventActionExportedInviteRevoke' };
result.invite = this.predicate();
return result;
  }],
  [3910056793, function() {
const result = { _: 'channelAdminLogEventActionExportedInviteEdit' };
result.prev_invite = this.predicate();
result.new_invite = this.predicate();
return result;
  }],
  [1048537159, function() {
const result = { _: 'channelAdminLogEventActionParticipantVolume' };
result.participant = this.predicate();
return result;
  }],
  [1855199800, function() {
const result = { _: 'channelAdminLogEventActionChangeHistoryTTL' };
result.prev_value = this.int();
result.new_value = this.int();
return result;
  }],
  [2723014423, function() {
const result = { _: 'messages.checkedHistoryImportPeer' };
result.confirm_text = this.string();
return result;
  }],
  [93890858, function() {
const result = { _: 'inputGroupCallStream' };
result.flags = this.int();
result.call = this.predicate();
result.time_ms = this.long();
result.scale = this.int();
if (result.flags & 1) result.video_channel = this.int();
if (result.flags & 1) result.video_quality = this.int();
return result;
  }],
  [2951045695, function() {
const result = { _: 'phone.joinAsPeers' };
result.peers = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [541839704, function() {
const result = { _: 'phone.exportedGroupCallInvite' };
result.link = this.string();
return result;
  }],
  [3622273573, function() {
const result = { _: 'inputBotInlineMessageMediaInvoice' };
result.flags = this.int();
result.title = this.string();
result.description = this.string();
if (result.flags & 1) result.photo = this.predicate();
result.invoice = this.predicate();
result.payload = this.bytes();
result.provider = this.string();
result.provider_data = this.predicate();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [894081801, function() {
const result = { _: 'botInlineMessageMediaInvoice' };
result.flags = this.int();
result.shipping_address_requested = !!(result.flags & 2);
result.test = !!(result.flags & 8);
result.title = this.string();
result.description = this.string();
if (result.flags & 1) result.photo = this.predicate();
result.currency = this.string();
result.total_amount = this.long();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [3013637729, function() {
const result = { _: 'messageActionGroupCallScheduled' };
result.call = this.predicate();
result.schedule_date = this.int();
return result;
  }],
  [3702593719, function() {
const result = { _: 'groupCallParticipantVideoSourceGroup' };
result.semantics = this.string();
result.sources = this.vector(this.int, false);
return result;
  }],
  [1735736008, function() {
const result = { _: 'groupCallParticipantVideo' };
result.flags = this.int();
result.paused = !!(result.flags & 1);
result.endpoint = this.string();
result.source_groups = this.vector(this.predicate, false);
if (result.flags & 2) result.audio_source = this.int();
return result;
  }],
  [192428418, function() {
const result = { _: 'updateGroupCallConnection' };
result.flags = this.int();
result.presentation = !!(result.flags & 1);
result.params = this.predicate();
return result;
  }],
  [2248056895, function() {
const result = { _: 'stickers.suggestedShortName' };
result.short_name = this.string();
return result;
  }],
  [795652779, function() {
const result = { _: 'botCommandScopeDefault' };
return result;
  }],
  [1011811544, function() {
const result = { _: 'botCommandScopeUsers' };
return result;
  }],
  [1877059713, function() {
const result = { _: 'botCommandScopeChats' };
return result;
  }],
  [3114950762, function() {
const result = { _: 'botCommandScopeChatAdmins' };
return result;
  }],
  [3684534653, function() {
const result = { _: 'botCommandScopePeer' };
result.peer = this.predicate();
return result;
  }],
  [1071145937, function() {
const result = { _: 'botCommandScopePeerAdmins' };
result.peer = this.predicate();
return result;
  }],
  [169026035, function() {
const result = { _: 'botCommandScopePeerUser' };
result.peer = this.predicate();
result.user_id = this.predicate();
return result;
  }],
  [3816265825, function() {
const result = { _: 'account.resetPasswordFailedWait' };
result.retry_date = this.int();
return result;
  }],
  [3924819069, function() {
const result = { _: 'account.resetPasswordRequestedWait' };
result.until_date = this.int();
return result;
  }],
  [3911636542, function() {
const result = { _: 'account.resetPasswordOk' };
return result;
  }],
  [1299263278, function() {
const result = { _: 'updateBotCommands' };
result.peer = this.predicate();
result.bot_id = this.long();
result.commands = this.vector(this.predicate, false);
return result;
  }],
  [2860016453, function() {
const result = { _: 'messageActionSetChatTheme' };
result.emoticon = this.string();
return result;
  }],
  [2958739121, function() {
const result = { _: 'sendMessageChooseStickerAction' };
return result;
  }],
  [3981673463, function() {
const result = { _: 'sponsoredMessage' };
result.flags = this.int();
result.recommended = !!(result.flags & 32);
result.show_peer_photo = !!(result.flags & 64);
result.random_id = this.bytes();
if (result.flags & 8) result.from_id = this.predicate();
if (result.flags & 16) result.chat_invite = this.predicate();
if (result.flags & 16) result.chat_invite_hash = this.string();
if (result.flags & 4) result.channel_post = this.int();
if (result.flags & 1) result.start_param = this.string();
if (result.flags & 512) result.webpage = this.predicate();
if (result.flags & 1024) result.app = this.predicate();
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
if (result.flags & 2048) result.button_text = this.string();
if (result.flags & 128) result.sponsor_info = this.string();
if (result.flags & 256) result.additional_info = this.string();
return result;
  }],
  [3387825543, function() {
const result = { _: 'messages.sponsoredMessages' };
result.flags = this.int();
if (result.flags & 1) result.posts_between = this.int();
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [215889721, function() {
const result = { _: 'inputStickerSetAnimatedEmojiAnimations' };
return result;
  }],
  [630664139, function() {
const result = { _: 'sendMessageEmojiInteraction' };
result.emoticon = this.string();
result.msg_id = this.int();
result.interaction = this.predicate();
return result;
  }],
  [3060109358, function() {
const result = { _: 'sendMessageEmojiInteractionSeen' };
result.emoticon = this.string();
return result;
  }],
  [3067680215, function() {
const result = { _: 'inputBotInlineMessageID64' };
result.dc_id = this.int();
result.owner_id = this.long();
result.id = this.int();
result.access_hash = this.long();
return result;
  }],
  [3383776159, function() {
const result = { _: 'searchResultsCalendarPeriod' };
result.date = this.int();
result.min_msg_id = this.int();
result.max_msg_id = this.int();
result.count = this.int();
return result;
  }],
  [343859772, function() {
const result = { _: 'messages.searchResultsCalendar' };
result.flags = this.int();
result.inexact = !!(result.flags & 1);
result.count = this.int();
result.min_date = this.int();
result.min_msg_id = this.int();
if (result.flags & 2) result.offset_id_offset = this.int();
result.periods = this.vector(this.predicate, false);
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2137295719, function() {
const result = { _: 'searchResultPosition' };
result.msg_id = this.int();
result.date = this.int();
result.offset = this.int();
return result;
  }],
  [1404185519, function() {
const result = { _: 'messages.searchResultsPositions' };
result.count = this.int();
result.positions = this.vector(this.predicate, false);
return result;
  }],
  [3955008459, function() {
const result = { _: 'messageActionChatJoinedByRequest' };
return result;
  }],
  [1885586395, function() {
const result = { _: 'updatePendingJoinRequests' };
result.peer = this.predicate();
result.requests_pending = this.int();
result.recent_requesters = this.vector(this.long, false);
return result;
  }],
  [299870598, function() {
const result = { _: 'updateBotChatInviteRequester' };
result.peer = this.predicate();
result.date = this.int();
result.user_id = this.long();
result.about = this.string();
result.invite = this.predicate();
result.qts = this.int();
return result;
  }],
  [2947945546, function() {
const result = { _: 'channelAdminLogEventActionParticipantJoinByRequest' };
result.invite = this.predicate();
result.approved_by = this.long();
return result;
  }],
  [3918005115, function() {
const result = { _: 'inputKeyboardButtonUserProfile' };
result.text = this.string();
result.user_id = this.predicate();
return result;
  }],
  [814112961, function() {
const result = { _: 'keyboardButtonUserProfile' };
result.text = this.string();
result.user_id = this.long();
return result;
  }],
  [4103516358, function() {
const result = { _: 'channels.sendAsPeers' };
result.peers = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3408578406, function() {
const result = { _: 'channelAdminLogEventActionToggleNoForwards' };
result.new_value = this.predicate();
return result;
  }],
  [3556320491, function() {
const result = { _: 'messages.stickerSetNotModified' };
return result;
  }],
  [997004590, function() {
const result = { _: 'users.userFull' };
result.full_user = this.predicate();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1753266509, function() {
const result = { _: 'messages.peerSettings' };
result.settings = this.predicate();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [663693416, function() {
const result = { _: 'channelAdminLogEventActionSendMessage' };
result.message = this.predicate();
return result;
  }],
  [3592083182, function() {
const result = { _: 'auth.codeTypeMissedCall' };
return result;
  }],
  [2181063812, function() {
const result = { _: 'auth.sentCodeTypeMissedCall' };
result.prefix = this.string();
result.length = this.int();
return result;
  }],
  [3282207583, function() {
const result = { _: 'auth.loggedOut' };
result.flags = this.int();
if (result.flags & 1) result.future_auth_token = this.bytes();
return result;
  }],
  [1578843320, function() {
const result = { _: 'updateMessageReactions' };
result.flags = this.int();
result.peer = this.predicate();
result.msg_id = this.int();
if (result.flags & 1) result.top_msg_id = this.int();
result.reactions = this.predicate();
return result;
  }],
  [2748435328, function() {
const result = { _: 'reactionCount' };
result.flags = this.int();
if (result.flags & 1) result.chosen_order = this.int();
result.reaction = this.predicate();
result.count = this.int();
return result;
  }],
  [1328256121, function() {
const result = { _: 'messageReactions' };
result.flags = this.int();
result.min = !!(result.flags & 1);
result.can_see_list = !!(result.flags & 4);
result.results = this.vector(this.predicate, false);
if (result.flags & 2) result.recent_reactions = this.vector(this.predicate);
return result;
  }],
  [834488621, function() {
const result = { _: 'messages.messageReactionsList' };
result.flags = this.int();
result.count = this.int();
result.reactions = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
if (result.flags & 1) result.next_offset = this.string();
return result;
  }],
  [3229084673, function() {
const result = { _: 'availableReaction' };
result.flags = this.int();
result.inactive = !!(result.flags & 1);
result.premium = !!(result.flags & 4);
result.reaction = this.string();
result.title = this.string();
result.static_icon = this.predicate();
result.appear_animation = this.predicate();
result.select_animation = this.predicate();
result.activate_animation = this.predicate();
result.effect_animation = this.predicate();
if (result.flags & 2) result.around_animation = this.predicate();
if (result.flags & 2) result.center_icon = this.predicate();
return result;
  }],
  [2668042583, function() {
const result = { _: 'messages.availableReactionsNotModified' };
return result;
  }],
  [1989032621, function() {
const result = { _: 'messages.availableReactions' };
result.hash = this.int();
result.reactions = this.vector(this.predicate, false);
return result;
  }],
  [852137487, function() {
const result = { _: 'messageEntitySpoiler' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [3192786680, function() {
const result = { _: 'channelAdminLogEventActionChangeAvailableReactions' };
result.prev_value = this.predicate();
result.new_value = this.predicate();
return result;
  }],
  [2356786748, function() {
const result = { _: 'messagePeerReaction' };
result.flags = this.int();
result.big = !!(result.flags & 1);
result.unread = !!(result.flags & 2);
result.my = !!(result.flags & 4);
result.peer_id = this.predicate();
result.date = this.int();
result.reaction = this.predicate();
return result;
  }],
  [2162903215, function() {
const result = { _: 'groupCallStreamChannel' };
result.channel = this.int();
result.scale = this.int();
result.last_timestamp_ms = this.long();
return result;
  }],
  [3504636594, function() {
const result = { _: 'phone.groupCallStreamChannels' };
result.channels = this.vector(this.predicate, false);
return result;
  }],
  [177124030, function() {
const result = { _: 'inputReportReasonIllegalDrugs' };
return result;
  }],
  [2663876157, function() {
const result = { _: 'inputReportReasonPersonalDetails' };
return result;
  }],
  [767505458, function() {
const result = { _: 'phone.groupCallStreamRtmpUrl' };
result.url = this.string();
result.key = this.string();
return result;
  }],
  [1165423600, function() {
const result = { _: 'attachMenuBotIconColor' };
result.name = this.string();
result.color = this.int();
return result;
  }],
  [2997303403, function() {
const result = { _: 'attachMenuBotIcon' };
result.flags = this.int();
result.name = this.string();
result.icon = this.predicate();
if (result.flags & 1) result.colors = this.vector(this.predicate);
return result;
  }],
  [3641544190, function() {
const result = { _: 'attachMenuBot' };
result.flags = this.int();
result.inactive = !!(result.flags & 1);
result.has_settings = !!(result.flags & 2);
result.request_write_access = !!(result.flags & 4);
result.show_in_attach_menu = !!(result.flags & 8);
result.show_in_side_menu = !!(result.flags & 16);
result.side_menu_disclaimer_needed = !!(result.flags & 32);
result.bot_id = this.long();
result.short_name = this.string();
if (result.flags & 8) result.peer_types = this.vector(this.predicate);
result.icons = this.vector(this.predicate, false);
return result;
  }],
  [4057500252, function() {
const result = { _: 'attachMenuBotsNotModified' };
return result;
  }],
  [1011024320, function() {
const result = { _: 'attachMenuBots' };
result.hash = this.long();
result.bots = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2478794367, function() {
const result = { _: 'attachMenuBotsBot' };
result.bot = this.predicate();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [397910539, function() {
const result = { _: 'updateAttachMenuBots' };
return result;
  }],
  [202659196, function() {
const result = { _: 'webViewResultUrl' };
result.query_id = this.long();
result.url = this.string();
return result;
  }],
  [2284811963, function() {
const result = { _: 'simpleWebViewResultUrl' };
result.url = this.string();
return result;
  }],
  [211046684, function() {
const result = { _: 'webViewMessageSent' };
result.flags = this.int();
if (result.flags & 1) result.msg_id = this.predicate();
return result;
  }],
  [361936797, function() {
const result = { _: 'updateWebViewResultSent' };
result.query_id = this.long();
return result;
  }],
  [326529584, function() {
const result = { _: 'keyboardButtonWebView' };
result.text = this.string();
result.url = this.string();
return result;
  }],
  [2696958044, function() {
const result = { _: 'keyboardButtonSimpleWebView' };
result.text = this.string();
result.url = this.string();
return result;
  }],
  [1205698681, function() {
const result = { _: 'messageActionWebViewDataSentMe' };
result.text = this.string();
result.data = this.string();
return result;
  }],
  [3032714421, function() {
const result = { _: 'messageActionWebViewDataSent' };
result.text = this.string();
return result;
  }],
  [347625491, function() {
const result = { _: 'updateBotMenuButton' };
result.bot_id = this.long();
result.button = this.predicate();
return result;
  }],
  [1966318984, function() {
const result = { _: 'botMenuButtonDefault' };
return result;
  }],
  [1113113093, function() {
const result = { _: 'botMenuButtonCommands' };
return result;
  }],
  [3350559974, function() {
const result = { _: 'botMenuButton' };
result.text = this.string();
result.url = this.string();
return result;
  }],
  [4227262641, function() {
const result = { _: 'account.savedRingtonesNotModified' };
return result;
  }],
  [3253284037, function() {
const result = { _: 'account.savedRingtones' };
result.hash = this.long();
result.ringtones = this.vector(this.predicate, false);
return result;
  }],
  [1960361625, function() {
const result = { _: 'updateSavedRingtones' };
return result;
  }],
  [2548612798, function() {
const result = { _: 'notificationSoundDefault' };
return result;
  }],
  [1863070943, function() {
const result = { _: 'notificationSoundNone' };
return result;
  }],
  [2198575844, function() {
const result = { _: 'notificationSoundLocal' };
result.title = this.string();
result.data = this.string();
return result;
  }],
  [4285300809, function() {
const result = { _: 'notificationSoundRingtone' };
result.id = this.long();
return result;
  }],
  [3072737133, function() {
const result = { _: 'account.savedRingtone' };
return result;
  }],
  [523271863, function() {
const result = { _: 'account.savedRingtoneConverted' };
result.document = this.predicate();
return result;
  }],
  [2104224014, function() {
const result = { _: 'attachMenuPeerTypeSameBotPM' };
return result;
  }],
  [3274439194, function() {
const result = { _: 'attachMenuPeerTypeBotPM' };
return result;
  }],
  [4047950623, function() {
const result = { _: 'attachMenuPeerTypePM' };
return result;
  }],
  [84480319, function() {
const result = { _: 'attachMenuPeerTypeChat' };
return result;
  }],
  [2080104188, function() {
const result = { _: 'attachMenuPeerTypeBroadcast' };
return result;
  }],
  [3977280183, function() {
const result = { _: 'chatInvitePublicJoinRequests' };
return result;
  }],
  [3317000281, function() {
const result = { _: 'inputInvoiceMessage' };
result.peer = this.predicate();
result.msg_id = this.int();
return result;
  }],
  [3274099439, function() {
const result = { _: 'inputInvoiceSlug' };
result.slug = this.string();
return result;
  }],
  [2932919257, function() {
const result = { _: 'payments.exportedInvoice' };
result.url = this.string();
return result;
  }],
  [8703322, function() {
const result = { _: 'updateTranscribedAudio' };
result.flags = this.int();
result.pending = !!(result.flags & 1);
result.peer = this.predicate();
result.msg_id = this.int();
result.transcription_id = this.long();
result.text = this.string();
return result;
  }],
  [3485063511, function() {
const result = { _: 'messages.transcribedAudio' };
result.flags = this.int();
result.pending = !!(result.flags & 1);
result.transcription_id = this.long();
result.text = this.string();
if (result.flags & 2) result.trial_remains_num = this.int();
if (result.flags & 2) result.trial_remains_until_date = this.int();
return result;
  }],
  [909284270, function() {
const result = { _: 'dialogFilterDefault' };
return result;
  }],
  [1395946908, function() {
const result = { _: 'help.premiumPromo' };
result.status_text = this.string();
result.status_entities = this.vector(this.predicate, false);
result.video_sections = this.vector(this.string, false);
result.videos = this.vector(this.predicate, false);
result.period_options = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3369010680, function() {
const result = { _: 'messageEntityCustomEmoji' };
result.offset = this.int();
result.length = this.int();
result.document_id = this.long();
return result;
  }],
  [4245985433, function() {
const result = { _: 'documentAttributeCustomEmoji' };
result.flags = this.int();
result.free = !!(result.flags & 1);
result.text_color = !!(result.flags & 2);
result.alt = this.string();
result.stickerset = this.predicate();
return result;
  }],
  [1087454222, function() {
const result = { _: 'stickerSetFullCovered' };
result.set = this.predicate();
result.packs = this.vector(this.predicate, false);
result.keywords = this.vector(this.predicate, false);
result.documents = this.vector(this.predicate, false);
return result;
  }],
  [2792693350, function() {
const result = { _: 'inputStorePaymentPremiumSubscription' };
result.flags = this.int();
result.restore = !!(result.flags & 1);
result.upgrade = !!(result.flags & 2);
return result;
  }],
  [1634697192, function() {
const result = { _: 'inputStorePaymentGiftPremium' };
result.user_id = this.predicate();
result.currency = this.string();
result.amount = this.long();
return result;
  }],
  [3359468268, function() {
const result = { _: 'messageActionGiftPremium' };
result.flags = this.int();
result.currency = this.string();
result.amount = this.long();
result.months = this.int();
if (result.flags & 1) result.crypto_currency = this.string();
if (result.flags & 1) result.crypto_amount = this.long();
return result;
  }],
  [1958953753, function() {
const result = { _: 'premiumGiftOption' };
result.flags = this.int();
result.months = this.int();
result.currency = this.string();
result.amount = this.long();
result.bot_url = this.string();
if (result.flags & 1) result.store_product = this.string();
return result;
  }],
  [3364567810, function() {
const result = { _: 'inputStickerSetPremiumGifts' };
return result;
  }],
  [4216080748, function() {
const result = { _: 'updateReadFeaturedEmojiStickers' };
return result;
  }],
  [2934349160, function() {
const result = { _: 'inputPrivacyKeyVoiceMessages' };
return result;
  }],
  [110621716, function() {
const result = { _: 'privacyKeyVoiceMessages' };
return result;
  }],
  [2298016283, function() {
const result = { _: 'paymentFormMethod' };
result.url = this.string();
result.title = this.string();
return result;
  }],
  [4100974884, function() {
const result = { _: 'inputWebFileAudioAlbumThumbLocation' };
result.flags = this.int();
result.small = !!(result.flags & 4);
if (result.flags & 1) result.document = this.predicate();
if (result.flags & 2) result.title = this.string();
if (result.flags & 2) result.performer = this.string();
return result;
  }],
  [769727150, function() {
const result = { _: 'emojiStatusEmpty' };
return result;
  }],
  [2459656605, function() {
const result = { _: 'emojiStatus' };
result.document_id = this.long();
return result;
  }],
  [4197492935, function() {
const result = { _: 'emojiStatusUntil' };
result.document_id = this.long();
result.until = this.int();
return result;
  }],
  [674706841, function() {
const result = { _: 'updateUserEmojiStatus' };
result.user_id = this.long();
result.emoji_status = this.predicate();
return result;
  }],
  [821314523, function() {
const result = { _: 'updateRecentEmojiStatuses' };
return result;
  }],
  [3498894917, function() {
const result = { _: 'account.emojiStatusesNotModified' };
return result;
  }],
  [2428790737, function() {
const result = { _: 'account.emojiStatuses' };
result.hash = this.long();
result.statuses = this.vector(this.predicate, false);
return result;
  }],
  [2046153753, function() {
const result = { _: 'reactionEmpty' };
return result;
  }],
  [455247544, function() {
const result = { _: 'reactionEmoji' };
result.emoticon = this.string();
return result;
  }],
  [2302016627, function() {
const result = { _: 'reactionCustomEmoji' };
result.document_id = this.long();
return result;
  }],
  [3942396604, function() {
const result = { _: 'chatReactionsNone' };
return result;
  }],
  [1385335754, function() {
const result = { _: 'chatReactionsAll' };
result.flags = this.int();
result.allow_custom = !!(result.flags & 1);
return result;
  }],
  [1713193015, function() {
const result = { _: 'chatReactionsSome' };
result.reactions = this.vector(this.predicate, false);
return result;
  }],
  [2960120799, function() {
const result = { _: 'messages.reactionsNotModified' };
return result;
  }],
  [3942512406, function() {
const result = { _: 'messages.reactions' };
result.hash = this.long();
result.reactions = this.vector(this.predicate, false);
return result;
  }],
  [1870160884, function() {
const result = { _: 'updateRecentReactions' };
return result;
  }],
  [2264715141, function() {
const result = { _: 'updateMoveStickerSetToTop' };
result.flags = this.int();
result.masks = !!(result.flags & 1);
result.emojis = !!(result.flags & 2);
result.stickerset = this.long();
return result;
  }],
  [4098946459, function() {
const result = { _: 'auth.sentCodeTypeEmailCode' };
result.flags = this.int();
result.apple_signin_allowed = !!(result.flags & 1);
result.google_signin_allowed = !!(result.flags & 2);
result.email_pattern = this.string();
result.length = this.int();
if (result.flags & 8) result.reset_available_period = this.int();
if (result.flags & 16) result.reset_pending_date = this.int();
return result;
  }],
  [2773032426, function() {
const result = { _: 'auth.sentCodeTypeSetUpEmailRequired' };
result.flags = this.int();
result.apple_signin_allowed = !!(result.flags & 1);
result.google_signin_allowed = !!(result.flags & 2);
return result;
  }],
  [1128644211, function() {
const result = { _: 'emailVerifyPurposeLoginSetup' };
result.phone_number = this.string();
result.phone_code_hash = this.string();
return result;
  }],
  [1383932651, function() {
const result = { _: 'emailVerifyPurposeLoginChange' };
return result;
  }],
  [3153401477, function() {
const result = { _: 'emailVerifyPurposePassport' };
return result;
  }],
  [2452510121, function() {
const result = { _: 'emailVerificationCode' };
result.code = this.string();
return result;
  }],
  [3683688130, function() {
const result = { _: 'emailVerificationGoogle' };
result.token = this.string();
return result;
  }],
  [2530243837, function() {
const result = { _: 'emailVerificationApple' };
result.token = this.string();
return result;
  }],
  [731303195, function() {
const result = { _: 'account.emailVerified' };
result.email = this.string();
return result;
  }],
  [3787132257, function() {
const result = { _: 'account.emailVerifiedLogin' };
result.email = this.string();
result.sent_code = this.predicate();
return result;
  }],
  [1596792306, function() {
const result = { _: 'premiumSubscriptionOption' };
result.flags = this.int();
result.current = !!(result.flags & 2);
result.can_purchase_upgrade = !!(result.flags & 4);
if (result.flags & 8) result.transaction = this.string();
result.months = this.int();
result.currency = this.string();
result.amount = this.long();
result.bot_url = this.string();
if (result.flags & 1) result.store_product = this.string();
return result;
  }],
  [80008398, function() {
const result = { _: 'inputStickerSetEmojiGenericAnimations' };
return result;
  }],
  [701560302, function() {
const result = { _: 'inputStickerSetEmojiDefaultStatuses' };
return result;
  }],
  [3088871476, function() {
const result = { _: 'sendAsPeer' };
result.flags = this.int();
result.premium_required = !!(result.flags & 1);
result.peer = this.predicate();
return result;
  }],
  [2908916936, function() {
const result = { _: 'messageExtendedMediaPreview' };
result.flags = this.int();
if (result.flags & 1) result.w = this.int();
if (result.flags & 1) result.h = this.int();
if (result.flags & 2) result.thumb = this.predicate();
if (result.flags & 4) result.video_duration = this.int();
return result;
  }],
  [3997670500, function() {
const result = { _: 'messageExtendedMedia' };
result.media = this.predicate();
return result;
  }],
  [1517529484, function() {
const result = { _: 'updateMessageExtendedMedia' };
result.peer = this.predicate();
result.msg_id = this.int();
result.extended_media = this.predicate();
return result;
  }],
  [4244550300, function() {
const result = { _: 'stickerKeyword' };
result.document_id = this.long();
result.keyword = this.vector(this.string, false);
return result;
  }],
  [3020371527, function() {
const result = { _: 'username' };
result.flags = this.int();
result.editable = !!(result.flags & 1);
result.active = !!(result.flags & 2);
result.username = this.string();
return result;
  }],
  [4031755177, function() {
const result = { _: 'channelAdminLogEventActionChangeUsernames' };
result.prev_value = this.vector(this.string, false);
result.new_value = this.vector(this.string, false);
return result;
  }],
  [46949251, function() {
const result = { _: 'channelAdminLogEventActionToggleForum' };
result.new_value = this.predicate();
return result;
  }],
  [1483767080, function() {
const result = { _: 'channelAdminLogEventActionCreateTopic' };
result.topic = this.predicate();
return result;
  }],
  [4033864200, function() {
const result = { _: 'channelAdminLogEventActionEditTopic' };
result.prev_topic = this.predicate();
result.new_topic = this.predicate();
return result;
  }],
  [2920712457, function() {
const result = { _: 'channelAdminLogEventActionDeleteTopic' };
result.topic = this.predicate();
return result;
  }],
  [1569535291, function() {
const result = { _: 'channelAdminLogEventActionPinTopic' };
result.flags = this.int();
if (result.flags & 1) result.prev_topic = this.predicate();
if (result.flags & 2) result.new_topic = this.predicate();
return result;
  }],
  [37687451, function() {
const result = { _: 'forumTopicDeleted' };
result.id = this.int();
return result;
  }],
  [1903173033, function() {
const result = { _: 'forumTopic' };
result.flags = this.int();
result.my = !!(result.flags & 2);
result.closed = !!(result.flags & 4);
result.pinned = !!(result.flags & 8);
result.short = !!(result.flags & 32);
result.hidden = !!(result.flags & 64);
result.id = this.int();
result.date = this.int();
result.title = this.string();
result.icon_color = this.int();
if (result.flags & 1) result.icon_emoji_id = this.long();
result.top_message = this.int();
result.read_inbox_max_id = this.int();
result.read_outbox_max_id = this.int();
result.unread_count = this.int();
result.unread_mentions_count = this.int();
result.unread_reactions_count = this.int();
result.from_id = this.predicate();
result.notify_settings = this.predicate();
if (result.flags & 16) result.draft = this.predicate();
return result;
  }],
  [913709011, function() {
const result = { _: 'messages.forumTopics' };
result.flags = this.int();
result.order_by_create_date = !!(result.flags & 1);
result.count = this.int();
result.topics = this.vector(this.predicate, false);
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
result.pts = this.int();
return result;
  }],
  [228168278, function() {
const result = { _: 'messageActionTopicCreate' };
result.flags = this.int();
result.title = this.string();
result.icon_color = this.int();
if (result.flags & 1) result.icon_emoji_id = this.long();
return result;
  }],
  [3230943264, function() {
const result = { _: 'messageActionTopicEdit' };
result.flags = this.int();
if (result.flags & 1) result.title = this.string();
if (result.flags & 2) result.icon_emoji_id = this.long();
if (result.flags & 4) result.closed = this.predicate();
if (result.flags & 8) result.hidden = this.predicate();
return result;
  }],
  [422509539, function() {
const result = { _: 'updateChannelPinnedTopic' };
result.flags = this.int();
result.pinned = !!(result.flags & 1);
result.channel_id = this.long();
result.topic_id = this.int();
return result;
  }],
  [1548122514, function() {
const result = { _: 'inputNotifyForumTopic' };
result.peer = this.predicate();
result.top_msg_id = this.int();
return result;
  }],
  [577659656, function() {
const result = { _: 'notifyForumTopic' };
result.peer = this.predicate();
result.top_msg_id = this.int();
return result;
  }],
  [1153562857, function() {
const result = { _: 'inputStickerSetEmojiDefaultTopicIcons' };
return result;
  }],
  [406407439, function() {
const result = { _: 'messages.sponsoredMessagesEmpty' };
return result;
  }],
  [4263085570, function() {
const result = { _: 'updateChannelPinnedTopics' };
result.flags = this.int();
result.channel_id = this.long();
if (result.flags & 1) result.order = this.vector(this.int);
return result;
  }],
  [1135897376, function() {
const result = { _: 'defaultHistoryTTL' };
result.period = this.int();
return result;
  }],
  [116234636, function() {
const result = { _: 'auth.codeTypeFragmentSms' };
return result;
  }],
  [3646315577, function() {
const result = { _: 'auth.sentCodeTypeFragmentSms' };
result.url = this.string();
result.length = this.int();
return result;
  }],
  [1103040667, function() {
const result = { _: 'exportedContactToken' };
result.url = this.string();
result.expires = this.int();
return result;
  }],
  [1693675004, function() {
const result = { _: 'channelAdminLogEventActionToggleAntiSpam' };
result.new_value = this.predicate();
return result;
  }],
  [1474192222, function() {
const result = { _: 'messageActionSuggestProfilePhoto' };
result.photo = this.predicate();
return result;
  }],
  [2008112412, function() {
const result = { _: 'stickerSetNoCovered' };
result.set = this.predicate();
return result;
  }],
  [542282808, function() {
const result = { _: 'updateUser' };
result.user_id = this.long();
return result;
  }],
  [596704836, function() {
const result = { _: 'auth.sentCodeSuccess' };
result.authorization = this.predicate();
return result;
  }],
  [827428507, function() {
const result = { _: 'messageActionRequestedPeer' };
result.button_id = this.int();
result.peers = this.vector(this.predicate, false);
return result;
  }],
  [1597737472, function() {
const result = { _: 'requestPeerTypeUser' };
result.flags = this.int();
if (result.flags & 1) result.bot = this.predicate();
if (result.flags & 2) result.premium = this.predicate();
return result;
  }],
  [3387977243, function() {
const result = { _: 'requestPeerTypeChat' };
result.flags = this.int();
result.creator = !!(result.flags & 1);
result.bot_participant = !!(result.flags & 32);
if (result.flags & 8) result.has_username = this.predicate();
if (result.flags & 16) result.forum = this.predicate();
if (result.flags & 2) result.user_admin_rights = this.predicate();
if (result.flags & 4) result.bot_admin_rights = this.predicate();
return result;
  }],
  [865857388, function() {
const result = { _: 'requestPeerTypeBroadcast' };
result.flags = this.int();
result.creator = !!(result.flags & 1);
if (result.flags & 8) result.has_username = this.predicate();
if (result.flags & 2) result.user_admin_rights = this.predicate();
if (result.flags & 4) result.bot_admin_rights = this.predicate();
return result;
  }],
  [1406648280, function() {
const result = { _: 'keyboardButtonRequestPeer' };
result.text = this.string();
result.button_id = this.int();
result.peer_type = this.predicate();
result.max_quantity = this.int();
return result;
  }],
  [1209970170, function() {
const result = { _: 'emojiListNotModified' };
return result;
  }],
  [2048790993, function() {
const result = { _: 'emojiList' };
result.hash = this.long();
result.document_id = this.vector(this.long, false);
return result;
  }],
  [3850048562, function() {
const result = { _: 'auth.sentCodeTypeFirebaseSms' };
result.flags = this.int();
if (result.flags & 1) result.nonce = this.bytes();
if (result.flags & 2) result.receipt = this.string();
if (result.flags & 2) result.push_timeout = this.int();
result.length = this.int();
return result;
  }],
  [2056961449, function() {
const result = { _: 'emojiGroup' };
result.title = this.string();
result.icon_emoji_id = this.long();
result.emoticons = this.vector(this.string, false);
return result;
  }],
  [1874111879, function() {
const result = { _: 'messages.emojiGroupsNotModified' };
return result;
  }],
  [2283780427, function() {
const result = { _: 'messages.emojiGroups' };
result.hash = this.int();
result.groups = this.vector(this.predicate, false);
return result;
  }],
  [4166795580, function() {
const result = { _: 'videoSizeEmojiMarkup' };
result.emoji_id = this.long();
result.background_colors = this.vector(this.int, false);
return result;
  }],
  [228623102, function() {
const result = { _: 'videoSizeStickerMarkup' };
result.stickerset = this.predicate();
result.sticker_id = this.long();
result.background_colors = this.vector(this.int, false);
return result;
  }],
  [1964978502, function() {
const result = { _: 'textWithEntities' };
result.text = this.string();
result.entities = this.vector(this.predicate, false);
return result;
  }],
  [870003448, function() {
const result = { _: 'messages.translateResult' };
result.result = this.vector(this.predicate, false);
return result;
  }],
  [3360175310, function() {
const result = { _: 'autoSaveSettings' };
result.flags = this.int();
result.photos = !!(result.flags & 1);
result.videos = !!(result.flags & 2);
if (result.flags & 4) result.video_max_size = this.long();
return result;
  }],
  [2170563911, function() {
const result = { _: 'autoSaveException' };
result.peer = this.predicate();
result.settings = this.predicate();
return result;
  }],
  [1279133341, function() {
const result = { _: 'account.autoSaveSettings' };
result.users_settings = this.predicate();
result.chats_settings = this.predicate();
result.broadcasts_settings = this.predicate();
result.exceptions = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3959795863, function() {
const result = { _: 'updateAutoSaveSettings' };
return result;
  }],
  [2094949405, function() {
const result = { _: 'help.appConfigNotModified' };
return result;
  }],
  [3709368366, function() {
const result = { _: 'help.appConfig' };
result.hash = this.int();
result.config = this.predicate();
return result;
  }],
  [2837495162, function() {
const result = { _: 'inputBotAppID' };
result.id = this.long();
result.access_hash = this.long();
return result;
  }],
  [2425095175, function() {
const result = { _: 'inputBotAppShortName' };
result.bot_id = this.predicate();
result.short_name = this.string();
return result;
  }],
  [1571189943, function() {
const result = { _: 'botAppNotModified' };
return result;
  }],
  [2516373974, function() {
const result = { _: 'botApp' };
result.flags = this.int();
result.id = this.long();
result.access_hash = this.long();
result.short_name = this.string();
result.title = this.string();
result.description = this.string();
result.photo = this.predicate();
if (result.flags & 1) result.document = this.predicate();
result.hash = this.long();
return result;
  }],
  [3947933173, function() {
const result = { _: 'messages.botApp' };
result.flags = this.int();
result.inactive = !!(result.flags & 1);
result.request_write_access = !!(result.flags & 2);
result.has_settings = !!(result.flags & 4);
result.app = this.predicate();
return result;
  }],
  [1008422669, function() {
const result = { _: 'appWebViewResultUrl' };
result.url = this.string();
return result;
  }],
  [3044185557, function() {
const result = { _: 'inlineBotWebView' };
result.text = this.string();
result.url = this.string();
return result;
  }],
  [1246753138, function() {
const result = { _: 'readParticipantDate' };
result.user_id = this.long();
result.date = this.int();
return result;
  }],
  [3438316246, function() {
const result = { _: 'updateGroupInvitePrivacyForbidden' };
result.user_id = this.long();
return result;
  }],
  [3595175080, function() {
const result = { _: 'dialogFilterChatlist' };
result.flags = this.int();
result.has_my_invites = !!(result.flags & 67108864);
result.id = this.int();
result.title = this.string();
if (result.flags & 33554432) result.emoticon = this.string();
result.pinned_peers = this.vector(this.predicate, false);
result.include_peers = this.vector(this.predicate, false);
return result;
  }],
  [4091599411, function() {
const result = { _: 'inputChatlistDialogFilter' };
result.filter_id = this.int();
return result;
  }],
  [206668204, function() {
const result = { _: 'exportedChatlistInvite' };
result.flags = this.int();
result.title = this.string();
result.url = this.string();
result.peers = this.vector(this.predicate, false);
return result;
  }],
  [283567014, function() {
const result = { _: 'chatlists.exportedChatlistInvite' };
result.filter = this.predicate();
result.invite = this.predicate();
return result;
  }],
  [279670215, function() {
const result = { _: 'chatlists.exportedInvites' };
result.invites = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [4203214425, function() {
const result = { _: 'chatlists.chatlistInviteAlready' };
result.filter_id = this.int();
result.missing_peers = this.vector(this.predicate, false);
result.already_peers = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [500007837, function() {
const result = { _: 'chatlists.chatlistInvite' };
result.flags = this.int();
result.title = this.string();
if (result.flags & 1) result.emoticon = this.string();
result.peers = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2478671757, function() {
const result = { _: 'chatlists.chatlistUpdates' };
result.missing_peers = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1348510708, function() {
const result = { _: 'messageActionSetChatWallPaper' };
result.flags = this.int();
result.same = !!(result.flags & 1);
result.for_both = !!(result.flags & 2);
result.wallpaper = this.predicate();
return result;
  }],
  [3903288752, function() {
const result = { _: 'bots.botInfo' };
result.name = this.string();
result.about = this.string();
result.description = this.string();
return result;
  }],
  [238759180, function() {
const result = { _: 'inlineQueryPeerTypeBotPM' };
return result;
  }],
  [3066834268, function() {
const result = { _: 'messagePeerVote' };
result.peer = this.predicate();
result.option = this.bytes();
result.date = this.int();
return result;
  }],
  [1959634180, function() {
const result = { _: 'messagePeerVoteInputOption' };
result.peer = this.predicate();
result.date = this.int();
return result;
  }],
  [1177089766, function() {
const result = { _: 'messagePeerVoteMultiple' };
result.peer = this.predicate();
result.options = this.vector(this.bytes, false);
result.date = this.int();
return result;
  }],
  [941870144, function() {
const result = { _: 'inputPrivacyKeyAbout' };
return result;
  }],
  [2760292193, function() {
const result = { _: 'privacyKeyAbout' };
return result;
  }],
  [1035529315, function() {
const result = { _: 'sponsoredWebPage' };
result.flags = this.int();
result.url = this.string();
result.site_name = this.string();
if (result.flags & 1) result.photo = this.predicate();
return result;
  }],
  [2371443926, function() {
const result = { _: 'storyViews' };
result.flags = this.int();
result.has_viewers = !!(result.flags & 2);
result.views_count = this.int();
if (result.flags & 4) result.forwards_count = this.int();
if (result.flags & 8) result.reactions = this.vector(this.predicate);
if (result.flags & 16) result.reactions_count = this.int();
if (result.flags & 1) result.recent_viewers = this.vector(this.long);
return result;
  }],
  [1374088783, function() {
const result = { _: 'storyItemDeleted' };
result.id = this.int();
return result;
  }],
  [4289579283, function() {
const result = { _: 'storyItemSkipped' };
result.flags = this.int();
result.close_friends = !!(result.flags & 256);
result.id = this.int();
result.date = this.int();
result.expire_date = this.int();
return result;
  }],
  [2942526881, function() {
const result = { _: 'storyItem' };
result.flags = this.int();
result.pinned = !!(result.flags & 32);
result.public = !!(result.flags & 128);
result.close_friends = !!(result.flags & 256);
result.min = !!(result.flags & 512);
result.noforwards = !!(result.flags & 1024);
result.edited = !!(result.flags & 2048);
result.contacts = !!(result.flags & 4096);
result.selected_contacts = !!(result.flags & 8192);
result.out = !!(result.flags & 65536);
result.id = this.int();
result.date = this.int();
if (result.flags & 131072) result.fwd_from = this.predicate();
result.expire_date = this.int();
if (result.flags & 1) result.caption = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
result.media = this.predicate();
if (result.flags & 16384) result.media_areas = this.vector(this.predicate);
if (result.flags & 4) result.privacy = this.vector(this.predicate);
if (result.flags & 8) result.views = this.predicate();
if (result.flags & 32768) result.sent_reaction = this.predicate();
return result;
  }],
  [1974712216, function() {
const result = { _: 'updateStory' };
result.peer = this.predicate();
result.story = this.predicate();
return result;
  }],
  [4149121835, function() {
const result = { _: 'updateReadStories' };
result.peer = this.predicate();
result.max_id = this.int();
return result;
  }],
  [291044926, function() {
const result = { _: 'stories.allStoriesNotModified' };
result.flags = this.int();
result.state = this.string();
result.stealth_mode = this.predicate();
return result;
  }],
  [1862033025, function() {
const result = { _: 'stories.allStories' };
result.flags = this.int();
result.has_more = !!(result.flags & 1);
result.count = this.int();
result.state = this.string();
result.peer_stories = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
result.stealth_mode = this.predicate();
return result;
  }],
  [1574486984, function() {
const result = { _: 'stories.stories' };
result.count = this.int();
result.stories = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [793067081, function() {
const result = { _: 'inputPrivacyValueAllowCloseFriends' };
return result;
  }],
  [4159232155, function() {
const result = { _: 'privacyValueAllowCloseFriends' };
return result;
  }],
  [2965236421, function() {
const result = { _: 'storyView' };
result.flags = this.int();
result.blocked = !!(result.flags & 1);
result.blocked_my_stories_from = !!(result.flags & 2);
result.user_id = this.long();
result.date = this.int();
if (result.flags & 4) result.reaction = this.predicate();
return result;
  }],
  [1507299269, function() {
const result = { _: 'stories.storyViewsList' };
result.flags = this.int();
result.count = this.int();
result.views_count = this.int();
result.forwards_count = this.int();
result.reactions_count = this.int();
result.views = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
if (result.flags & 1) result.next_offset = this.string();
return result;
  }],
  [3734957341, function() {
const result = { _: 'stories.storyViews' };
result.views = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [583071445, function() {
const result = { _: 'inputReplyToMessage' };
result.flags = this.int();
result.reply_to_msg_id = this.int();
if (result.flags & 1) result.top_msg_id = this.int();
if (result.flags & 2) result.reply_to_peer_id = this.predicate();
if (result.flags & 4) result.quote_text = this.string();
if (result.flags & 8) result.quote_entities = this.vector(this.predicate);
if (result.flags & 16) result.quote_offset = this.int();
return result;
  }],
  [363917955, function() {
const result = { _: 'inputReplyToStory' };
result.user_id = this.predicate();
result.story_id = this.int();
return result;
  }],
  [2627256257, function() {
const result = { _: 'messageReplyStoryHeader' };
result.user_id = this.long();
result.story_id = this.int();
return result;
  }],
  [468923833, function() {
const result = { _: 'updateStoryID' };
result.id = this.int();
result.random_id = this.long();
return result;
  }],
  [1070138683, function() {
const result = { _: 'exportedStoryLink' };
result.link = this.string();
return result;
  }],
  [2315114360, function() {
const result = { _: 'inputMediaStory' };
result.peer = this.predicate();
result.id = this.int();
return result;
  }],
  [1758159491, function() {
const result = { _: 'messageMediaStory' };
result.flags = this.int();
result.via_mention = !!(result.flags & 2);
result.peer = this.predicate();
result.id = this.int();
if (result.flags & 1) result.story = this.predicate();
return result;
  }],
  [781501415, function() {
const result = { _: 'webPageAttributeStory' };
result.flags = this.int();
result.peer = this.predicate();
result.id = this.int();
if (result.flags & 1) result.story = this.predicate();
return result;
  }],
  [1898850301, function() {
const result = { _: 'storiesStealthMode' };
result.flags = this.int();
if (result.flags & 1) result.active_until_date = this.int();
if (result.flags & 2) result.cooldown_until_date = this.int();
return result;
  }],
  [738741697, function() {
const result = { _: 'updateStoriesStealthMode' };
result.stealth_mode = this.predicate();
return result;
  }],
  [64088654, function() {
const result = { _: 'mediaAreaCoordinates' };
result.x = this.double();
result.y = this.double();
result.w = this.double();
result.h = this.double();
result.rotation = this.double();
return result;
  }],
  [3196246940, function() {
const result = { _: 'mediaAreaVenue' };
result.coordinates = this.predicate();
result.geo = this.predicate();
result.title = this.string();
result.address = this.string();
result.provider = this.string();
result.venue_id = this.string();
result.venue_type = this.string();
return result;
  }],
  [2994872703, function() {
const result = { _: 'inputMediaAreaVenue' };
result.coordinates = this.predicate();
result.query_id = this.long();
result.result_id = this.string();
return result;
  }],
  [3750443810, function() {
const result = { _: 'mediaAreaGeoPoint' };
result.coordinates = this.predicate();
result.geo = this.predicate();
return result;
  }],
  [2103604867, function() {
const result = { _: 'updateSentStoryReaction' };
result.peer = this.predicate();
result.story_id = this.int();
result.reaction = this.predicate();
return result;
  }],
  [340088945, function() {
const result = { _: 'mediaAreaSuggestedReaction' };
result.flags = this.int();
result.dark = !!(result.flags & 1);
result.flipped = !!(result.flags & 2);
result.coordinates = this.predicate();
result.reaction = this.predicate();
return result;
  }],
  [2587224473, function() {
const result = { _: 'peerStories' };
result.flags = this.int();
result.peer = this.predicate();
if (result.flags & 1) result.max_read_id = this.int();
result.stories = this.vector(this.predicate, false);
return result;
  }],
  [3404105576, function() {
const result = { _: 'stories.peerStories' };
result.stories = this.predicate();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [4250800829, function() {
const result = { _: 'messages.webPage' };
result.webpage = this.predicate();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2743099199, function() {
const result = { _: 'inputStorePaymentPremiumGiftCode' };
result.flags = this.int();
result.users = this.vector(this.predicate, false);
if (result.flags & 1) result.boost_peer = this.predicate();
result.currency = this.string();
result.amount = this.long();
return result;
  }],
  [369444042, function() {
const result = { _: 'inputStorePaymentPremiumGiveaway' };
result.flags = this.int();
result.only_new_subscribers = !!(result.flags & 1);
result.winners_are_visible = !!(result.flags & 8);
result.boost_peer = this.predicate();
if (result.flags & 2) result.additional_peers = this.vector(this.predicate);
if (result.flags & 4) result.countries_iso2 = this.vector(this.string);
if (result.flags & 16) result.prize_description = this.string();
result.random_id = this.long();
result.until_date = this.int();
result.currency = this.string();
result.amount = this.long();
return result;
  }],
  [2560125965, function() {
const result = { _: 'inputInvoicePremiumGiftCode' };
result.purpose = this.predicate();
result.option = this.predicate();
return result;
  }],
  [629052971, function() {
const result = { _: 'premiumGiftCodeOption' };
result.flags = this.int();
result.users = this.int();
result.months = this.int();
if (result.flags & 1) result.store_product = this.string();
if (result.flags & 2) result.store_quantity = this.int();
result.currency = this.string();
result.amount = this.long();
return result;
  }],
  [675942550, function() {
const result = { _: 'payments.checkedGiftCode' };
result.flags = this.int();
result.via_giveaway = !!(result.flags & 4);
if (result.flags & 16) result.from_id = this.predicate();
if (result.flags & 8) result.giveaway_msg_id = this.int();
if (result.flags & 1) result.to_id = this.long();
result.date = this.int();
result.months = this.int();
if (result.flags & 2) result.used_date = this.int();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3668805040, function() {
const result = { _: 'messageMediaGiveaway' };
result.flags = this.int();
result.only_new_subscribers = !!(result.flags & 1);
result.winners_are_visible = !!(result.flags & 4);
result.channels = this.vector(this.long, false);
if (result.flags & 2) result.countries_iso2 = this.vector(this.string);
if (result.flags & 8) result.prize_description = this.string();
result.quantity = this.int();
result.months = this.int();
result.until_date = this.int();
return result;
  }],
  [1737240073, function() {
const result = { _: 'messageActionGiftCode' };
result.flags = this.int();
result.via_giveaway = !!(result.flags & 1);
result.unclaimed = !!(result.flags & 4);
if (result.flags & 2) result.boost_peer = this.predicate();
result.months = this.int();
result.slug = this.string();
if (result.flags & 4) result.currency = this.string();
if (result.flags & 4) result.amount = this.long();
if (result.flags & 8) result.crypto_currency = this.string();
if (result.flags & 8) result.crypto_amount = this.long();
return result;
  }],
  [858499565, function() {
const result = { _: 'messageActionGiveawayLaunch' };
return result;
  }],
  [1130879648, function() {
const result = { _: 'payments.giveawayInfo' };
result.flags = this.int();
result.participating = !!(result.flags & 1);
result.preparing_results = !!(result.flags & 8);
result.start_date = this.int();
if (result.flags & 2) result.joined_too_early_date = this.int();
if (result.flags & 4) result.admin_disallowed_chat_id = this.long();
if (result.flags & 16) result.disallowed_country = this.string();
return result;
  }],
  [13456752, function() {
const result = { _: 'payments.giveawayInfoResults' };
result.flags = this.int();
result.winner = !!(result.flags & 1);
result.refunded = !!(result.flags & 2);
result.start_date = this.int();
if (result.flags & 1) result.gift_code_slug = this.string();
result.finish_date = this.int();
result.winners_count = this.int();
result.activated_count = this.int();
return result;
  }],
  [34469328, function() {
const result = { _: 'messageEntityBlockquote' };
result.offset = this.int();
result.length = this.int();
return result;
  }],
  [2991824212, function() {
const result = { _: 'prepaidGiveaway' };
result.id = this.long();
result.months = this.int();
result.quantity = this.int();
result.date = this.int();
return result;
  }],
  [3256584265, function() {
const result = { _: 'inputMediaWebPage' };
result.flags = this.int();
result.force_large_media = !!(result.flags & 1);
result.force_small_media = !!(result.flags & 2);
result.optional = !!(result.flags & 4);
result.url = this.string();
return result;
  }],
  [3185362192, function() {
const result = { _: 'inputBotInlineMessageMediaWebPage' };
result.flags = this.int();
result.invert_media = !!(result.flags & 8);
result.force_large_media = !!(result.flags & 16);
result.force_small_media = !!(result.flags & 32);
result.optional = !!(result.flags & 64);
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
result.url = this.string();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [2157631910, function() {
const result = { _: 'botInlineMessageMediaWebPage' };
result.flags = this.int();
result.invert_media = !!(result.flags & 8);
result.force_large_media = !!(result.flags & 16);
result.force_small_media = !!(result.flags & 32);
result.manual = !!(result.flags & 128);
result.safe = !!(result.flags & 256);
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
result.url = this.string();
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [706514033, function() {
const result = { _: 'boost' };
result.flags = this.int();
result.gift = !!(result.flags & 2);
result.giveaway = !!(result.flags & 4);
result.unclaimed = !!(result.flags & 8);
result.id = this.string();
if (result.flags & 1) result.user_id = this.long();
if (result.flags & 4) result.giveaway_msg_id = this.int();
result.date = this.int();
result.expires = this.int();
if (result.flags & 16) result.used_gift_slug = this.string();
if (result.flags & 32) result.multiplier = this.int();
return result;
  }],
  [2264424764, function() {
const result = { _: 'premium.boostsList' };
result.flags = this.int();
result.count = this.int();
result.boosts = this.vector(this.predicate, false);
if (result.flags & 1) result.next_offset = this.string();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3293069660, function() {
const result = { _: 'myBoost' };
result.flags = this.int();
result.slot = this.int();
if (result.flags & 1) result.peer = this.predicate();
result.date = this.int();
result.expires = this.int();
if (result.flags & 2) result.cooldown_until_date = this.int();
return result;
  }],
  [2598512866, function() {
const result = { _: 'premium.myBoosts' };
result.my_boosts = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1230586490, function() {
const result = { _: 'premium.boostsStatus' };
result.flags = this.int();
result.my_boost = !!(result.flags & 4);
result.level = this.int();
result.current_level_boosts = this.int();
result.boosts = this.int();
if (result.flags & 16) result.gift_boosts = this.int();
if (result.flags & 1) result.next_level_boosts = this.int();
if (result.flags & 2) result.premium_audience = this.predicate();
result.boost_url = this.string();
if (result.flags & 8) result.prepaid_giveaways = this.vector(this.predicate);
if (result.flags & 4) result.my_boost_slots = this.vector(this.int);
return result;
  }],
  [2421019804, function() {
const result = { _: 'updateBotChatBoost' };
result.peer = this.predicate();
result.boost = this.predicate();
result.qts = this.int();
return result;
  }],
  [129403168, function() {
const result = { _: 'updateChannelViewForumAsMessages' };
result.channel_id = this.long();
result.enabled = this.predicate();
return result;
  }],
  [715107781, function() {
const result = { _: 'messageActionGiveawayResults' };
result.winners_count = this.int();
result.unclaimed_count = this.int();
return result;
  }],
  [2923368477, function() {
const result = { _: 'updatePeerWallpaper' };
result.flags = this.int();
result.wallpaper_overridden = !!(result.flags & 2);
result.peer = this.predicate();
if (result.flags & 1) result.wallpaper = this.predicate();
return result;
  }],
  [3089555792, function() {
const result = { _: 'storyFwdHeader' };
result.flags = this.int();
result.modified = !!(result.flags & 8);
if (result.flags & 1) result.from = this.predicate();
if (result.flags & 2) result.from_name = this.string();
if (result.flags & 4) result.story_id = this.int();
return result;
  }],
  [3875901055, function() {
const result = { _: 'postInteractionCountersMessage' };
result.msg_id = this.int();
result.views = this.int();
result.forwards = this.int();
result.reactions = this.int();
return result;
  }],
  [2319978023, function() {
const result = { _: 'postInteractionCountersStory' };
result.story_id = this.int();
result.views = this.int();
result.forwards = this.int();
result.reactions = this.int();
return result;
  }],
  [1355613820, function() {
const result = { _: 'stats.storyStats' };
result.views_graph = this.predicate();
result.reactions_by_emotion_graph = this.predicate();
return result;
  }],
  [32685898, function() {
const result = { _: 'publicForwardMessage' };
result.message = this.predicate();
return result;
  }],
  [3992169936, function() {
const result = { _: 'publicForwardStory' };
result.peer = this.predicate();
result.story = this.predicate();
return result;
  }],
  [2466479648, function() {
const result = { _: 'stats.publicForwards' };
result.flags = this.int();
result.count = this.int();
result.forwards = this.vector(this.predicate, false);
if (result.flags & 1) result.next_offset = this.string();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3041614543, function() {
const result = { _: 'peerColor' };
result.flags = this.int();
if (result.flags & 1) result.color = this.int();
if (result.flags & 2) result.background_emoji_id = this.long();
return result;
  }],
  [639736408, function() {
const result = { _: 'help.peerColorSet' };
result.colors = this.vector(this.int, false);
return result;
  }],
  [1987928555, function() {
const result = { _: 'help.peerColorProfileSet' };
result.palette_colors = this.vector(this.int, false);
result.bg_colors = this.vector(this.int, false);
result.story_colors = this.vector(this.int, false);
return result;
  }],
  [4018417835, function() {
const result = { _: 'help.peerColorOption' };
result.flags = this.int();
result.hidden = !!(result.flags & 1);
result.color_id = this.int();
if (result.flags & 2) result.colors = this.predicate();
if (result.flags & 4) result.dark_colors = this.predicate();
if (result.flags & 8) result.channel_min_level = this.int();
return result;
  }],
  [732034510, function() {
const result = { _: 'help.peerColorsNotModified' };
return result;
  }],
  [16313608, function() {
const result = { _: 'help.peerColors' };
result.hash = this.int();
result.colors = this.vector(this.predicate, false);
return result;
  }],
  [3331919976, function() {
const result = { _: 'messageMediaGiveawayResults' };
result.flags = this.int();
result.only_new_subscribers = !!(result.flags & 1);
result.refunded = !!(result.flags & 4);
result.channel_id = this.long();
if (result.flags & 8) result.additional_peers_count = this.int();
result.launch_msg_id = this.int();
result.winners_count = this.int();
result.unclaimed_count = this.int();
result.winners = this.vector(this.long, false);
result.months = this.int();
if (result.flags & 2) result.prize_description = this.string();
result.until_date = this.int();
return result;
  }],
  [1620104917, function() {
const result = { _: 'storyReaction' };
result.peer_id = this.predicate();
result.date = this.int();
result.reaction = this.predicate();
return result;
  }],
  [3148555843, function() {
const result = { _: 'storyReactionPublicForward' };
result.message = this.predicate();
return result;
  }],
  [3486322451, function() {
const result = { _: 'storyReactionPublicRepost' };
result.peer_id = this.predicate();
result.story = this.predicate();
return result;
  }],
  [2858383516, function() {
const result = { _: 'stories.storyReactionsList' };
result.flags = this.int();
result.count = this.int();
result.reactions = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
if (result.flags & 1) result.next_offset = this.string();
return result;
  }],
  [2424530699, function() {
const result = { _: 'storyViewPublicForward' };
result.flags = this.int();
result.blocked = !!(result.flags & 1);
result.blocked_my_stories_from = !!(result.flags & 2);
result.message = this.predicate();
return result;
  }],
  [3178549065, function() {
const result = { _: 'storyViewPublicRepost' };
result.flags = this.int();
result.blocked = !!(result.flags & 1);
result.blocked_my_stories_from = !!(result.flags & 2);
result.peer_id = this.predicate();
result.story = this.predicate();
return result;
  }],
  [1469507456, function() {
const result = { _: 'channelAdminLogEventActionChangePeerColor' };
result.prev_value = this.predicate();
result.new_value = this.predicate();
return result;
  }],
  [1581742885, function() {
const result = { _: 'channelAdminLogEventActionChangeProfilePeerColor' };
result.prev_value = this.predicate();
result.new_value = this.predicate();
return result;
  }],
  [834362706, function() {
const result = { _: 'channelAdminLogEventActionChangeWallpaper' };
result.prev_value = this.predicate();
result.new_value = this.predicate();
return result;
  }],
  [1051328177, function() {
const result = { _: 'channelAdminLogEventActionChangeEmojiStatus' };
result.prev_value = this.predicate();
result.new_value = this.predicate();
return result;
  }],
  [1232373075, function() {
const result = { _: 'inputStickerSetEmojiChannelDefaultStatuses' };
return result;
  }],
  [1996756655, function() {
const result = { _: 'mediaAreaChannelPost' };
result.coordinates = this.predicate();
result.channel_id = this.long();
result.msg_id = this.int();
return result;
  }],
  [577893055, function() {
const result = { _: 'inputMediaAreaChannelPost' };
result.coordinates = this.predicate();
result.channel = this.predicate();
result.msg_id = this.int();
return result;
  }],
  [2887898062, function() {
const result = { _: 'updateBotMessageReaction' };
result.peer = this.predicate();
result.msg_id = this.int();
result.date = this.int();
result.actor = this.predicate();
result.old_reactions = this.vector(this.predicate, false);
result.new_reactions = this.vector(this.predicate, false);
result.qts = this.int();
return result;
  }],
  [164329305, function() {
const result = { _: 'updateBotMessageReactions' };
result.peer = this.predicate();
result.msg_id = this.int();
result.date = this.int();
result.reactions = this.vector(this.predicate, false);
result.qts = this.int();
return result;
  }],
  [3179793260, function() {
const result = { _: 'savedDialog' };
result.flags = this.int();
result.pinned = !!(result.flags & 4);
result.peer = this.predicate();
result.top_message = this.int();
return result;
  }],
  [2930744948, function() {
const result = { _: 'updateSavedDialogPinned' };
result.flags = this.int();
result.pinned = !!(result.flags & 1);
result.peer = this.predicate();
return result;
  }],
  [1751942566, function() {
const result = { _: 'updatePinnedSavedDialogs' };
result.flags = this.int();
if (result.flags & 1) result.order = this.vector(this.predicate);
return result;
  }],
  [4164608545, function() {
const result = { _: 'messages.savedDialogs' };
result.dialogs = this.vector(this.predicate, false);
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1153080793, function() {
const result = { _: 'messages.savedDialogsSlice' };
result.count = this.int();
result.dialogs = this.vector(this.predicate, false);
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3223285736, function() {
const result = { _: 'messages.savedDialogsNotModified' };
result.count = this.int();
return result;
  }],
]);
module.exports = parserMap;