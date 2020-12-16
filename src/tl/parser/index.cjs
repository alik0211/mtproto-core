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
  [396093539, function() {
const result = { _: 'inputPeerChat' };
result.chat_id = this.int();
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
result.file = this.predicate();
if (result.flags & 1) result.stickers = this.vector(this.predicate);
if (result.flags & 2) result.ttl_seconds = this.int();
return result;
  }],
  [3015312949, function() {
const result = { _: 'inputMediaPhoto' };
result.flags = this.int();
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
  [3326243406, function() {
const result = { _: 'inputChatUploadedPhoto' };
result.flags = this.int();
if (result.flags & 1) result.file = this.predicate();
if (result.flags & 2) result.video = this.predicate();
if (result.flags & 4) result.video_start_ts = this.double();
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
  [2645671021, function() {
const result = { _: 'peerUser' };
result.user_id = this.int();
return result;
  }],
  [3134252475, function() {
const result = { _: 'peerChat' };
result.chat_id = this.int();
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
  [537022650, function() {
const result = { _: 'userEmpty' };
result.id = this.int();
return result;
  }],
  [1326562017, function() {
const result = { _: 'userProfilePhotoEmpty' };
return result;
  }],
  [1775479590, function() {
const result = { _: 'userProfilePhoto' };
result.flags = this.int();
result.has_video = !!(result.flags & 1);
result.photo_id = this.long();
result.photo_small = this.predicate();
result.photo_big = this.predicate();
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
  [2611140608, function() {
const result = { _: 'chatEmpty' };
result.id = this.int();
return result;
  }],
  [1004149726, function() {
const result = { _: 'chat' };
result.flags = this.int();
result.creator = !!(result.flags & 1);
result.kicked = !!(result.flags & 2);
result.left = !!(result.flags & 4);
result.deactivated = !!(result.flags & 32);
result.id = this.int();
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
  [120753115, function() {
const result = { _: 'chatForbidden' };
result.id = this.int();
result.title = this.string();
return result;
  }],
  [461151667, function() {
const result = { _: 'chatFull' };
result.flags = this.int();
result.can_set_username = !!(result.flags & 128);
result.has_scheduled = !!(result.flags & 256);
result.id = this.int();
result.about = this.string();
result.participants = this.predicate();
if (result.flags & 4) result.chat_photo = this.predicate();
result.notify_settings = this.predicate();
result.exported_invite = this.predicate();
if (result.flags & 8) result.bot_info = this.vector(this.predicate);
if (result.flags & 64) result.pinned_msg_id = this.int();
if (result.flags & 2048) result.folder_id = this.int();
return result;
  }],
  [3369552190, function() {
const result = { _: 'chatParticipant' };
result.user_id = this.int();
result.inviter_id = this.int();
result.date = this.int();
return result;
  }],
  [4237298731, function() {
const result = { _: 'chatParticipantsForbidden' };
result.flags = this.int();
result.chat_id = this.int();
if (result.flags & 1) result.self_participant = this.predicate();
return result;
  }],
  [1061556205, function() {
const result = { _: 'chatParticipants' };
result.chat_id = this.int();
result.participants = this.vector(this.predicate, false);
result.version = this.int();
return result;
  }],
  [935395612, function() {
const result = { _: 'chatPhotoEmpty' };
return result;
  }],
  [3523977020, function() {
const result = { _: 'chatPhoto' };
result.flags = this.int();
result.has_video = !!(result.flags & 1);
result.photo_small = this.predicate();
result.photo_big = this.predicate();
result.dc_id = this.int();
return result;
  }],
  [2212879956, function() {
const result = { _: 'messageEmpty' };
result.id = this.int();
return result;
  }],
  [1487813065, function() {
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
result.id = this.int();
if (result.flags & 256) result.from_id = this.predicate();
result.peer_id = this.predicate();
if (result.flags & 4) result.fwd_from = this.predicate();
if (result.flags & 2048) result.via_bot_id = this.int();
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
if (result.flags & 4194304) result.restriction_reason = this.vector(this.predicate);
return result;
  }],
  [678405636, function() {
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
return result;
  }],
  [1038967584, function() {
const result = { _: 'messageMediaEmpty' };
return result;
  }],
  [1766936791, function() {
const result = { _: 'messageMediaPhoto' };
result.flags = this.int();
if (result.flags & 1) result.photo = this.predicate();
if (result.flags & 4) result.ttl_seconds = this.int();
return result;
  }],
  [1457575028, function() {
const result = { _: 'messageMediaGeo' };
result.geo = this.predicate();
return result;
  }],
  [3421653312, function() {
const result = { _: 'messageMediaContact' };
result.phone_number = this.string();
result.first_name = this.string();
result.last_name = this.string();
result.vcard = this.string();
result.user_id = this.int();
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
  [2791541658, function() {
const result = { _: 'messageActionChatCreate' };
result.title = this.string();
result.users = this.vector(this.int, false);
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
  [1217033015, function() {
const result = { _: 'messageActionChatAddUser' };
result.users = this.vector(this.int, false);
return result;
  }],
  [2997787404, function() {
const result = { _: 'messageActionChatDeleteUser' };
result.user_id = this.int();
return result;
  }],
  [739712882, function() {
const result = { _: 'dialog' };
result.flags = this.int();
result.pinned = !!(result.flags & 4);
result.unread_mark = !!(result.flags & 8);
result.peer = this.predicate();
result.top_message = this.int();
result.read_inbox_max_id = this.int();
result.read_outbox_max_id = this.int();
result.unread_count = this.int();
result.unread_mentions_count = this.int();
result.notify_settings = this.predicate();
if (result.flags & 1) result.pts = this.int();
if (result.flags & 2) result.draft = this.predicate();
if (result.flags & 16) result.folder_id = this.int();
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
  [2009052699, function() {
const result = { _: 'photoSize' };
result.type = this.string();
result.location = this.predicate();
result.w = this.int();
result.h = this.int();
result.size = this.int();
return result;
  }],
  [3920049402, function() {
const result = { _: 'photoCachedSize' };
result.type = this.string();
result.location = this.predicate();
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
  [3439659286, function() {
const result = { _: 'auth.authorization' };
result.flags = this.int();
if (result.flags & 1) result.tmp_sessions = this.int();
result.user = this.predicate();
return result;
  }],
  [3751189549, function() {
const result = { _: 'auth.exportedAuthorization' };
result.id = this.int();
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
  [2621249934, function() {
const result = { _: 'inputPeerNotifySettings' };
result.flags = this.int();
if (result.flags & 1) result.show_previews = this.predicate();
if (result.flags & 2) result.silent = this.predicate();
if (result.flags & 4) result.mute_until = this.int();
if (result.flags & 8) result.sound = this.string();
return result;
  }],
  [2941295904, function() {
const result = { _: 'peerNotifySettings' };
result.flags = this.int();
if (result.flags & 1) result.show_previews = this.predicate();
if (result.flags & 2) result.silent = this.predicate();
if (result.flags & 4) result.mute_until = this.int();
if (result.flags & 8) result.sound = this.string();
return result;
  }],
  [1933519201, function() {
const result = { _: 'peerSettings' };
result.flags = this.int();
result.report_spam = !!(result.flags & 1);
result.add_contact = !!(result.flags & 2);
result.block_contact = !!(result.flags & 4);
result.share_contact = !!(result.flags & 8);
result.need_contacts_exception = !!(result.flags & 16);
result.report_geo = !!(result.flags & 32);
result.autoarchived = !!(result.flags & 128);
if (result.flags & 64) result.geo_distance = this.int();
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
  [3782503690, function() {
const result = { _: 'inputReportReasonOther' };
result.text = this.string();
return result;
  }],
  [3992026130, function() {
const result = { _: 'userFull' };
result.flags = this.int();
result.blocked = !!(result.flags & 1);
result.phone_calls_available = !!(result.flags & 16);
result.phone_calls_private = !!(result.flags & 32);
result.can_pin_message = !!(result.flags & 128);
result.has_scheduled = !!(result.flags & 4096);
result.video_calls_available = !!(result.flags & 8192);
result.user = this.predicate();
if (result.flags & 2) result.about = this.string();
result.settings = this.predicate();
if (result.flags & 4) result.profile_photo = this.predicate();
result.notify_settings = this.predicate();
if (result.flags & 8) result.bot_info = this.predicate();
if (result.flags & 64) result.pinned_msg_id = this.int();
result.common_chats_count = this.int();
if (result.flags & 2048) result.folder_id = this.int();
return result;
  }],
  [4178692500, function() {
const result = { _: 'contact' };
result.user_id = this.int();
result.mutual = this.predicate();
return result;
  }],
  [3489825848, function() {
const result = { _: 'importedContact' };
result.user_id = this.int();
result.client_id = this.long();
return result;
  }],
  [3546811489, function() {
const result = { _: 'contactStatus' };
result.user_id = this.int();
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
  [1548249383, function() {
const result = { _: 'updateUserTyping' };
result.user_id = this.int();
result.action = this.predicate();
return result;
  }],
  [2590370335, function() {
const result = { _: 'updateChatUserTyping' };
result.chat_id = this.int();
result.user_id = this.int();
result.action = this.predicate();
return result;
  }],
  [125178264, function() {
const result = { _: 'updateChatParticipants' };
result.participants = this.predicate();
return result;
  }],
  [469489699, function() {
const result = { _: 'updateUserStatus' };
result.user_id = this.int();
result.status = this.predicate();
return result;
  }],
  [2805148531, function() {
const result = { _: 'updateUserName' };
result.user_id = this.int();
result.first_name = this.string();
result.last_name = this.string();
result.username = this.string();
return result;
  }],
  [2503031564, function() {
const result = { _: 'updateUserPhoto' };
result.user_id = this.int();
result.date = this.int();
result.photo = this.predicate();
result.previous = this.predicate();
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
  [580309704, function() {
const result = { _: 'updateShortMessage' };
result.flags = this.int();
result.out = !!(result.flags & 2);
result.mentioned = !!(result.flags & 16);
result.media_unread = !!(result.flags & 32);
result.silent = !!(result.flags & 8192);
result.id = this.int();
result.user_id = this.int();
result.message = this.string();
result.pts = this.int();
result.pts_count = this.int();
result.date = this.int();
if (result.flags & 4) result.fwd_from = this.predicate();
if (result.flags & 2048) result.via_bot_id = this.int();
if (result.flags & 8) result.reply_to = this.predicate();
if (result.flags & 128) result.entities = this.vector(this.predicate);
return result;
  }],
  [1076714939, function() {
const result = { _: 'updateShortChatMessage' };
result.flags = this.int();
result.out = !!(result.flags & 2);
result.mentioned = !!(result.flags & 16);
result.media_unread = !!(result.flags & 32);
result.silent = !!(result.flags & 8192);
result.id = this.int();
result.from_id = this.int();
result.chat_id = this.int();
result.message = this.string();
result.pts = this.int();
result.pts_count = this.int();
result.date = this.int();
if (result.flags & 4) result.fwd_from = this.predicate();
if (result.flags & 2048) result.via_bot_id = this.int();
if (result.flags & 8) result.reply_to = this.predicate();
if (result.flags & 128) result.entities = this.vector(this.predicate);
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
result.id = this.int();
result.ip_address = this.string();
result.port = this.int();
if (result.flags & 1024) result.secret = this.bytes();
return result;
  }],
  [856375399, function() {
const result = { _: 'config' };
result.flags = this.int();
result.phonecalls_enabled = !!(result.flags & 2);
result.default_p2p_contacts = !!(result.flags & 8);
result.preload_featured_stickers = !!(result.flags & 16);
result.ignore_phone_entities = !!(result.flags & 32);
result.revoke_pm_inbox = !!(result.flags & 64);
result.blocked_mode = !!(result.flags & 256);
result.pfs_enabled = !!(result.flags & 8192);
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
result.saved_gifs_limit = this.int();
result.edit_time_limit = this.int();
result.revoke_time_limit = this.int();
result.revoke_pm_time_limit = this.int();
result.rating_e_decay = this.int();
result.stickers_recent_limit = this.int();
result.stickers_faved_limit = this.int();
result.channels_read_media_period = this.int();
if (result.flags & 1) result.tmp_sessions = this.int();
result.pinned_dialogs_count_max = this.int();
result.pinned_infolder_count_max = this.int();
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
return result;
  }],
  [2384074613, function() {
const result = { _: 'nearestDc' };
result.country = this.string();
result.this_dc = this.int();
result.nearest_dc = this.int();
return result;
  }],
  [497489295, function() {
const result = { _: 'help.appUpdate' };
result.flags = this.int();
result.can_not_skip = !!(result.flags & 1);
result.id = this.int();
result.version = this.string();
result.text = this.string();
result.entities = this.vector(this.predicate, false);
if (result.flags & 2) result.document = this.predicate();
if (result.flags & 4) result.url = this.string();
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
  [1006044124, function() {
const result = { _: 'encryptedChatWaiting' };
result.id = this.int();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.int();
result.participant_id = this.int();
return result;
  }],
  [1651608194, function() {
const result = { _: 'encryptedChatRequested' };
result.flags = this.int();
if (result.flags & 1) result.folder_id = this.int();
result.id = this.int();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.int();
result.participant_id = this.int();
result.g_a = this.bytes();
return result;
  }],
  [4199992886, function() {
const result = { _: 'encryptedChat' };
result.id = this.int();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.int();
result.participant_id = this.int();
result.g_a_or_b = this.bytes();
result.key_fingerprint = this.long();
return result;
  }],
  [332848423, function() {
const result = { _: 'encryptedChatDiscarded' };
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
  [1248893260, function() {
const result = { _: 'encryptedFile' };
result.id = this.long();
result.access_hash = this.long();
result.size = this.int();
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
  [3930787420, function() {
const result = { _: 'updateChatParticipantAdd' };
result.chat_id = this.int();
result.user_id = this.int();
result.inviter_id = this.int();
result.date = this.int();
result.version = this.int();
return result;
  }],
  [1851755554, function() {
const result = { _: 'updateChatParticipantDelete' };
result.chat_id = this.int();
result.user_id = this.int();
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
result.file = this.predicate();
if (result.flags & 4) result.thumb = this.predicate();
result.mime_type = this.string();
result.attributes = this.vector(this.predicate, false);
if (result.flags & 1) result.stickers = this.vector(this.predicate);
if (result.flags & 2) result.ttl_seconds = this.int();
return result;
  }],
  [598418386, function() {
const result = { _: 'inputMediaDocument' };
result.flags = this.int();
result.id = this.predicate();
if (result.flags & 1) result.ttl_seconds = this.int();
return result;
  }],
  [2628808919, function() {
const result = { _: 'messageMediaDocument' };
result.flags = this.int();
if (result.flags & 1) result.document = this.predicate();
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
  [512177195, function() {
const result = { _: 'document' };
result.flags = this.int();
result.id = this.long();
result.access_hash = this.long();
result.file_reference = this.bytes();
result.date = this.int();
result.mime_type = this.string();
result.size = this.int();
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
  [1297858060, function() {
const result = { _: 'privacyValueAllowUsers' };
result.users = this.vector(this.int, false);
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
  [209668535, function() {
const result = { _: 'privacyValueDisallowUsers' };
result.users = this.vector(this.int, false);
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
  [314130811, function() {
const result = { _: 'updateUserPhone' };
result.user_id = this.int();
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
  [250621158, function() {
const result = { _: 'documentAttributeVideo' };
result.flags = this.int();
result.round_message = !!(result.flags & 1);
result.supports_streaming = !!(result.flags & 2);
result.duration = this.int();
result.w = this.int();
result.h = this.int();
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
  [3831077821, function() {
const result = { _: 'messages.stickers' };
result.hash = this.int();
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
  [3992797279, function() {
const result = { _: 'messages.allStickers' };
result.hash = this.int();
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
  [3943987176, function() {
const result = { _: 'webPageEmpty' };
result.id = this.long();
return result;
  }],
  [3313949212, function() {
const result = { _: 'webPagePending' };
result.id = this.long();
result.date = this.int();
return result;
  }],
  [3902555570, function() {
const result = { _: 'webPage' };
result.flags = this.int();
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
  [2737690112, function() {
const result = { _: 'messageMediaWebPage' };
result.webpage = this.predicate();
return result;
  }],
  [2902578717, function() {
const result = { _: 'authorization' };
result.flags = this.int();
result.current = !!(result.flags & 1);
result.official_app = !!(result.flags & 2);
result.password_pending = !!(result.flags & 4);
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
  [307276766, function() {
const result = { _: 'account.authorizations' };
result.authorizations = this.vector(this.predicate, false);
return result;
  }],
  [2904965624, function() {
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
  [1776236393, function() {
const result = { _: 'chatInviteEmpty' };
return result;
  }],
  [4230874556, function() {
const result = { _: 'chatInviteExported' };
result.link = this.string();
return result;
  }],
  [1516793212, function() {
const result = { _: 'chatInviteAlready' };
result.chat = this.predicate();
return result;
  }],
  [3754096014, function() {
const result = { _: 'chatInvite' };
result.flags = this.int();
result.channel = !!(result.flags & 1);
result.broadcast = !!(result.flags & 2);
result.public = !!(result.flags & 4);
result.megagroup = !!(result.flags & 8);
result.title = this.string();
result.photo = this.predicate();
result.participants_count = this.int();
if (result.flags & 16) result.participants = this.vector(this.predicate);
return result;
  }],
  [4171036136, function() {
const result = { _: 'messageActionChatJoinedByLink' };
result.inviter_id = this.int();
return result;
  }],
  [1757493555, function() {
const result = { _: 'updateReadMessagesContents' };
result.messages = this.vector(this.int, false);
result.pts = this.int();
result.pts_count = this.int();
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
  [4004802343, function() {
const result = { _: 'stickerSet' };
result.flags = this.int();
result.archived = !!(result.flags & 2);
result.official = !!(result.flags & 4);
result.masks = !!(result.flags & 8);
result.animated = !!(result.flags & 32);
if (result.flags & 1) result.installed_date = this.int();
result.id = this.long();
result.access_hash = this.long();
result.title = this.string();
result.short_name = this.string();
if (result.flags & 16) result.thumb = this.predicate();
if (result.flags & 16) result.thumb_dc_id = this.int();
result.count = this.int();
result.hash = this.int();
return result;
  }],
  [3054118054, function() {
const result = { _: 'messages.stickerSet' };
result.set = this.predicate();
result.packs = this.vector(this.predicate, false);
result.documents = this.vector(this.predicate, false);
return result;
  }],
  [2474924225, function() {
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
result.id = this.int();
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
return result;
  }],
  [3262826695, function() {
const result = { _: 'botCommand' };
result.command = this.string();
result.description = this.string();
return result;
  }],
  [2565348666, function() {
const result = { _: 'botInfo' };
result.user_id = this.int();
result.description = this.string();
result.commands = this.vector(this.predicate, false);
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
  [4094724768, function() {
const result = { _: 'replyKeyboardForceReply' };
result.flags = this.int();
result.single_use = !!(result.flags & 2);
result.selective = !!(result.flags & 4);
return result;
  }],
  [889353612, function() {
const result = { _: 'replyKeyboardMarkup' };
result.flags = this.int();
result.resize = !!(result.flags & 1);
result.single_use = !!(result.flags & 2);
result.selective = !!(result.flags & 4);
result.rows = this.vector(this.predicate, false);
return result;
  }],
  [2072935910, function() {
const result = { _: 'inputPeerUser' };
result.user_id = this.int();
result.access_hash = this.long();
return result;
  }],
  [3626575894, function() {
const result = { _: 'inputUser' };
result.user_id = this.int();
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
  [301019932, function() {
const result = { _: 'updateShortSentMessage' };
result.flags = this.int();
result.out = !!(result.flags & 2);
result.id = this.int();
result.pts = this.int();
result.pts_count = this.int();
result.date = this.int();
if (result.flags & 512) result.media = this.predicate();
if (result.flags & 128) result.entities = this.vector(this.predicate);
return result;
  }],
  [4002160262, function() {
const result = { _: 'inputChannelEmpty' };
return result;
  }],
  [2951442734, function() {
const result = { _: 'inputChannel' };
result.channel_id = this.int();
result.access_hash = this.long();
return result;
  }],
  [3185435954, function() {
const result = { _: 'peerChannel' };
result.channel_id = this.int();
return result;
  }],
  [548253432, function() {
const result = { _: 'inputPeerChannel' };
result.channel_id = this.int();
result.access_hash = this.long();
return result;
  }],
  [3541734942, function() {
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
result.id = this.int();
if (result.flags & 8192) result.access_hash = this.long();
result.title = this.string();
if (result.flags & 64) result.username = this.string();
result.photo = this.predicate();
result.date = this.int();
result.version = this.int();
if (result.flags & 512) result.restriction_reason = this.vector(this.predicate);
if (result.flags & 16384) result.admin_rights = this.predicate();
if (result.flags & 32768) result.banned_rights = this.predicate();
if (result.flags & 262144) result.default_banned_rights = this.predicate();
if (result.flags & 131072) result.participants_count = this.int();
return result;
  }],
  [681420594, function() {
const result = { _: 'channelForbidden' };
result.flags = this.int();
result.broadcast = !!(result.flags & 32);
result.megagroup = !!(result.flags & 256);
result.id = this.int();
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
  [4041631530, function() {
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
result.id = this.int();
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
result.exported_invite = this.predicate();
result.bot_info = this.vector(this.predicate, false);
if (result.flags & 16) result.migrated_from_chat_id = this.int();
if (result.flags & 16) result.migrated_from_max_id = this.int();
if (result.flags & 32) result.pinned_msg_id = this.int();
if (result.flags & 256) result.stickerset = this.predicate();
if (result.flags & 512) result.available_min_id = this.int();
if (result.flags & 2048) result.folder_id = this.int();
if (result.flags & 16384) result.linked_chat_id = this.int();
if (result.flags & 32768) result.location = this.predicate();
if (result.flags & 131072) result.slowmode_seconds = this.int();
if (result.flags & 262144) result.slowmode_next_send_date = this.int();
if (result.flags & 4096) result.stats_dc = this.int();
result.pts = this.int();
return result;
  }],
  [182649427, function() {
const result = { _: 'messageRange' };
result.min_id = this.int();
result.max_id = this.int();
return result;
  }],
  [1682413576, function() {
const result = { _: 'messages.channelMessages' };
result.flags = this.int();
result.inexact = !!(result.flags & 2);
result.pts = this.int();
result.count = this.int();
if (result.flags & 4) result.offset_id_offset = this.int();
result.messages = this.vector(this.predicate, false);
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2513611922, function() {
const result = { _: 'messageActionChannelCreate' };
result.title = this.string();
return result;
  }],
  [3942934523, function() {
const result = { _: 'updateChannelTooLong' };
result.flags = this.int();
result.channel_id = this.int();
if (result.flags & 1) result.pts = this.int();
return result;
  }],
  [3067369046, function() {
const result = { _: 'updateChannel' };
result.channel_id = this.int();
return result;
  }],
  [1656358105, function() {
const result = { _: 'updateNewChannelMessage' };
result.message = this.predicate();
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [856380452, function() {
const result = { _: 'updateReadChannelInbox' };
result.flags = this.int();
if (result.flags & 1) result.folder_id = this.int();
result.channel_id = this.int();
result.max_id = this.int();
result.still_unread_count = this.int();
result.pts = this.int();
return result;
  }],
  [3279233481, function() {
const result = { _: 'updateDeleteChannelMessages' };
result.channel_id = this.int();
result.messages = this.vector(this.int, false);
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [2560699211, function() {
const result = { _: 'updateChannelMessageViews' };
result.channel_id = this.int();
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
  [367766557, function() {
const result = { _: 'channelParticipant' };
result.user_id = this.int();
result.date = this.int();
return result;
  }],
  [2737347181, function() {
const result = { _: 'channelParticipantSelf' };
result.user_id = this.int();
result.inviter_id = this.int();
result.date = this.int();
return result;
  }],
  [1149094475, function() {
const result = { _: 'channelParticipantCreator' };
result.flags = this.int();
result.user_id = this.int();
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
  [4117684904, function() {
const result = { _: 'channels.channelParticipants' };
result.count = this.int();
result.participants = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3503927651, function() {
const result = { _: 'channels.channelParticipant' };
result.participant = this.predicate();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [3658699658, function() {
const result = { _: 'chatParticipantCreator' };
result.user_id = this.int();
return result;
  }],
  [3805733942, function() {
const result = { _: 'chatParticipantAdmin' };
result.user_id = this.int();
result.inviter_id = this.int();
result.date = this.int();
return result;
  }],
  [3062896985, function() {
const result = { _: 'updateChatParticipantAdmin' };
result.chat_id = this.int();
result.user_id = this.int();
result.is_admin = this.predicate();
result.version = this.int();
return result;
  }],
  [1371385889, function() {
const result = { _: 'messageActionChatMigrateTo' };
result.channel_id = this.int();
return result;
  }],
  [2958420718, function() {
const result = { _: 'messageActionChannelMigrateFrom' };
result.title = this.string();
result.chat_id = this.int();
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
result.order = this.vector(this.long, false);
return result;
  }],
  [1135492588, function() {
const result = { _: 'updateStickerSets' };
return result;
  }],
  [3892468898, function() {
const result = { _: 'messages.savedGifsNotModified' };
return result;
  }],
  [772213157, function() {
const result = { _: 'messages.savedGifs' };
result.hash = this.int();
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
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [1036876423, function() {
const result = { _: 'inputBotInlineMessageText' };
result.flags = this.int();
result.no_webpage = !!(result.flags & 1);
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
result.message = this.string();
if (result.flags & 2) result.entities = this.vector(this.predicate);
if (result.flags & 4) result.reply_markup = this.predicate();
return result;
  }],
  [2357159394, function() {
const result = { _: 'botInlineMessageText' };
result.flags = this.int();
result.no_webpage = !!(result.flags & 1);
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
  [2491197512, function() {
const result = { _: 'messages.botResults' };
result.flags = this.int();
result.gallery = !!(result.flags & 1);
result.query_id = this.long();
if (result.flags & 2) result.next_offset = this.string();
if (result.flags & 4) result.switch_pm = this.predicate();
result.results = this.vector(this.predicate, false);
result.cache_time = this.int();
result.users = this.vector(this.predicate, false);
return result;
  }],
  [1417832080, function() {
const result = { _: 'updateBotInlineQuery' };
result.flags = this.int();
result.query_id = this.long();
result.user_id = this.int();
result.query = this.string();
if (result.flags & 1) result.geo = this.predicate();
result.offset = this.string();
return result;
  }],
  [239663460, function() {
const result = { _: 'updateBotInlineSend' };
result.flags = this.int();
result.user_id = this.int();
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
  [1601666510, function() {
const result = { _: 'messageFwdHeader' };
result.flags = this.int();
if (result.flags & 1) result.from_id = this.predicate();
if (result.flags & 32) result.from_name = this.string();
result.date = this.int();
if (result.flags & 4) result.channel_post = this.int();
if (result.flags & 8) result.post_author = this.string();
if (result.flags & 16) result.saved_from_peer = this.predicate();
if (result.flags & 16) result.saved_from_msg_id = this.int();
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
  [90744648, function() {
const result = { _: 'keyboardButtonSwitchInline' };
result.flags = this.int();
result.same_peer = !!(result.flags & 1);
result.text = this.string();
result.query = this.string();
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
  [3879028705, function() {
const result = { _: 'updateBotCallbackQuery' };
result.flags = this.int();
result.query_id = this.long();
result.user_id = this.int();
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
  [4191320666, function() {
const result = { _: 'updateInlineBotCallbackQuery' };
result.flags = this.int();
result.query_id = this.long();
result.user_id = this.int();
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
  [892193368, function() {
const result = { _: 'messageEntityMentionName' };
result.offset = this.int();
result.length = this.int();
result.user_id = this.int();
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
  [634833351, function() {
const result = { _: 'updateReadChannelOutbox' };
result.channel_id = this.int();
result.max_id = this.int();
return result;
  }],
  [3995842921, function() {
const result = { _: 'updateDraftMessage' };
result.peer = this.predicate();
result.draft = this.predicate();
return result;
  }],
  [453805082, function() {
const result = { _: 'draftMessageEmpty' };
result.flags = this.int();
if (result.flags & 1) result.date = this.int();
return result;
  }],
  [4253970719, function() {
const result = { _: 'draftMessage' };
result.flags = this.int();
result.no_webpage = !!(result.flags & 2);
if (result.flags & 1) result.reply_to_msg_id = this.int();
result.message = this.string();
if (result.flags & 8) result.entities = this.vector(this.predicate);
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
  [3064709953, function() {
const result = { _: 'messages.featuredStickers' };
result.hash = this.int();
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
  [586395571, function() {
const result = { _: 'messages.recentStickers' };
result.hash = this.int();
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
result.url = this.string();
if (result.flags & 1) result.ttl_seconds = this.int();
return result;
  }],
  [4216511641, function() {
const result = { _: 'inputMediaDocumentExternal' };
result.flags = this.int();
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
  [1493171408, function() {
const result = { _: 'highScore' };
result.pos = this.int();
result.user_id = this.int();
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
  [1081547008, function() {
const result = { _: 'updateChannelWebPage' };
result.channel_id = this.int();
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
  [3272254296, function() {
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
result.currency = this.string();
result.prices = this.vector(this.predicate, false);
return result;
  }],
  [4108359363, function() {
const result = { _: 'inputMediaInvoice' };
result.flags = this.int();
result.title = this.string();
result.description = this.string();
if (result.flags & 1) result.photo = this.predicate();
result.invoice = this.predicate();
result.payload = this.bytes();
result.provider = this.string();
result.provider_data = this.predicate();
result.start_param = this.string();
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
result.currency = this.string();
result.total_amount = this.long();
result.payload = this.bytes();
if (result.flags & 1) result.info = this.predicate();
if (result.flags & 2) result.shipping_option_id = this.string();
result.charge = this.predicate();
return result;
  }],
  [2220168007, function() {
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
  [1080663248, function() {
const result = { _: 'messageActionPaymentSent' };
result.currency = this.string();
result.total_amount = this.long();
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
  [1062645411, function() {
const result = { _: 'payments.paymentForm' };
result.flags = this.int();
result.can_save_credentials = !!(result.flags & 4);
result.password_missing = !!(result.flags & 8);
result.bot_id = this.int();
result.invoice = this.predicate();
result.provider_id = this.int();
result.url = this.string();
if (result.flags & 16) result.native_provider = this.string();
if (result.flags & 16) result.native_params = this.predicate();
if (result.flags & 1) result.saved_info = this.predicate();
if (result.flags & 2) result.saved_credentials = this.predicate();
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
  [1342771681, function() {
const result = { _: 'payments.paymentReceipt' };
result.flags = this.int();
result.date = this.int();
result.bot_id = this.int();
result.invoice = this.predicate();
result.provider_id = this.int();
if (result.flags & 1) result.info = this.predicate();
if (result.flags & 2) result.shipping = this.predicate();
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
  [3771582784, function() {
const result = { _: 'updateBotShippingQuery' };
result.query_id = this.long();
result.user_id = this.int();
result.payload = this.bytes();
result.shipping_address = this.predicate();
return result;
  }],
  [1563376297, function() {
const result = { _: 'updateBotPrecheckoutQuery' };
result.flags = this.int();
result.query_id = this.long();
result.user_id = this.int();
result.payload = this.bytes();
if (result.flags & 1) result.info = this.predicate();
if (result.flags & 2) result.shipping_option_id = this.string();
result.currency = this.string();
result.total_amount = this.long();
return result;
  }],
  [4288717974, function() {
const result = { _: 'inputStickerSetItem' };
result.flags = this.int();
result.document = this.predicate();
result.emoji = this.string();
if (result.flags & 1) result.mask_coords = this.predicate();
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
  [462375633, function() {
const result = { _: 'phoneCallWaiting' };
result.flags = this.int();
result.video = !!(result.flags & 64);
result.id = this.long();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.int();
result.participant_id = this.int();
result.protocol = this.predicate();
if (result.flags & 1) result.receive_date = this.int();
return result;
  }],
  [2280307539, function() {
const result = { _: 'phoneCallRequested' };
result.flags = this.int();
result.video = !!(result.flags & 64);
result.id = this.long();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.int();
result.participant_id = this.int();
result.g_a_hash = this.bytes();
result.protocol = this.predicate();
return result;
  }],
  [2575058250, function() {
const result = { _: 'phoneCallAccepted' };
result.flags = this.int();
result.video = !!(result.flags & 64);
result.id = this.long();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.int();
result.participant_id = this.int();
result.g_b = this.bytes();
result.protocol = this.predicate();
return result;
  }],
  [2269294207, function() {
const result = { _: 'phoneCall' };
result.flags = this.int();
result.p2p_allowed = !!(result.flags & 32);
result.video = !!(result.flags & 64);
result.id = this.long();
result.access_hash = this.long();
result.date = this.int();
result.admin_id = this.int();
result.participant_id = this.int();
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
  [2639009728, function() {
const result = { _: 'phoneConnection' };
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
  [3435051951, function() {
const result = { _: 'channelParticipantAdmin' };
result.flags = this.int();
result.can_edit = !!(result.flags & 1);
result.self = !!(result.flags & 2);
result.user_id = this.int();
if (result.flags & 2) result.inviter_id = this.int();
result.promoted_by = this.int();
result.date = this.int();
result.admin_rights = this.predicate();
if (result.flags & 4) result.rank = this.string();
return result;
  }],
  [470789295, function() {
const result = { _: 'channelParticipantBanned' };
result.flags = this.int();
result.left = !!(result.flags & 1);
result.user_id = this.int();
result.kicked_by = this.int();
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
  [995769920, function() {
const result = { _: 'channelAdminLogEvent' };
result.id = this.long();
result.date = this.int();
result.user_id = this.int();
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
  [4085198614, function() {
const result = { _: 'messages.favedStickers' };
result.hash = this.int();
result.packs = this.vector(this.predicate, false);
result.stickers = this.vector(this.predicate, false);
return result;
  }],
  [3843135853, function() {
const result = { _: 'updateFavedStickers' };
return result;
  }],
  [2307472197, function() {
const result = { _: 'updateChannelReadMessagesContents' };
result.channel_id = this.int();
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
  [3389379854, function() {
const result = { _: 'inputPaymentCredentialsAndroidPay' };
result.payment_token = this.predicate();
result.google_transaction_id = this.string();
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
  [1893427255, function() {
const result = { _: 'updateChannelAvailableMessages' };
result.channel_id = this.int();
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
  [2377921334, function() {
const result = { _: 'recentMeUrlUser' };
result.url = this.string();
result.user_id = this.int();
return result;
  }],
  [2686132985, function() {
const result = { _: 'recentMeUrlChat' };
result.url = this.string();
result.chat_id = this.int();
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
  [3402187762, function() {
const result = { _: 'webAuthorization' };
result.hash = this.long();
result.bot_id = this.int();
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
  [2884218878, function() {
const result = { _: 'messageActionBotAllowed' };
result.domain = this.string();
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
  [1359533640, function() {
const result = { _: 'messages.foundStickerSets' };
result.hash = this.int();
result.sets = this.vector(this.predicate, false);
return result;
  }],
  [1648543603, function() {
const result = { _: 'fileHash' };
result.offset = this.int();
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
  [3760683618, function() {
const result = { _: 'secureFile' };
result.id = this.long();
result.access_hash = this.long();
result.size = this.int();
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
  [3135029667, function() {
const result = { _: 'pollResults' };
result.flags = this.int();
result.min = !!(result.flags & 1);
if (result.flags & 2) result.results = this.vector(this.predicate);
if (result.flags & 4) result.total_voters = this.int();
if (result.flags & 8) result.recent_voters = this.vector(this.int);
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
  [1881892265, function() {
const result = { _: 'account.wallPapers' };
result.hash = this.int();
result.wallpapers = this.vector(this.predicate, false);
return result;
  }],
  [3737042563, function() {
const result = { _: 'codeSettings' };
result.flags = this.int();
result.allow_flashcall = !!(result.flags & 1);
result.current_number = !!(result.flags & 2);
result.allow_app_hash = !!(result.flags & 16);
return result;
  }],
  [84438264, function() {
const result = { _: 'wallPaperSettings' };
result.flags = this.int();
result.blur = !!(result.flags & 2);
result.motion = !!(result.flags & 4);
if (result.flags & 1) result.background_color = this.int();
if (result.flags & 16) result.second_background_color = this.int();
if (result.flags & 8) result.intensity = this.int();
if (result.flags & 16) result.rotation = this.int();
return result;
  }],
  [3762434803, function() {
const result = { _: 'autoDownloadSettings' };
result.flags = this.int();
result.disabled = !!(result.flags & 1);
result.video_preload_large = !!(result.flags & 2);
result.audio_preload_next = !!(result.flags & 4);
result.phonecalls_less_data = !!(result.flags & 8);
result.photo_size_max = this.int();
result.video_size_max = this.int();
result.file_size_max = this.int();
result.video_upload_maxbitrate = this.int();
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
  [3162490573, function() {
const result = { _: 'fileLocationToBeDeprecated' };
result.volume_id = this.long();
result.local_id = this.int();
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
  [668375447, function() {
const result = { _: 'inputPeerPhotoFileLocation' };
result.flags = this.int();
result.big = !!(result.flags & 1);
result.peer = this.predicate();
result.volume_id = this.long();
result.local_id = this.int();
return result;
  }],
  [230353641, function() {
const result = { _: 'inputStickerSetThumb' };
result.stickerset = this.predicate();
result.volume_id = this.long();
result.local_id = this.int();
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
  [756118935, function() {
const result = { _: 'inputUserFromMessage' };
result.peer = this.predicate();
result.msg_id = this.int();
result.user_id = this.int();
return result;
  }],
  [707290417, function() {
const result = { _: 'inputChannelFromMessage' };
result.peer = this.predicate();
result.msg_id = this.int();
result.channel_id = this.int();
return result;
  }],
  [398123750, function() {
const result = { _: 'inputPeerUserFromMessage' };
result.peer = this.predicate();
result.msg_id = this.int();
result.user_id = this.int();
return result;
  }],
  [2627073979, function() {
const result = { _: 'inputPeerChannelFromMessage' };
result.peer = this.predicate();
result.msg_id = this.int();
result.channel_id = this.int();
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
  [2725218331, function() {
const result = { _: 'channelAdminLogEventActionChangeLinkedChat' };
result.prev_value = this.int();
result.new_value = this.int();
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
  [1283572154, function() {
const result = { _: 'inputPrivacyValueAllowChatParticipants' };
result.chats = this.vector(this.int, false);
return result;
  }],
  [3626197935, function() {
const result = { _: 'inputPrivacyValueDisallowChatParticipants' };
result.chats = this.vector(this.int, false);
return result;
  }],
  [415136107, function() {
const result = { _: 'privacyValueAllowChatParticipants' };
result.chats = this.vector(this.int, false);
return result;
  }],
  [2897086096, function() {
const result = { _: 'privacyValueDisallowChatParticipants' };
result.chats = this.vector(this.int, false);
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
  [34469328, function() {
const result = { _: 'messageEntityBlockquote' };
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
  [42930452, function() {
const result = { _: 'theme' };
result.flags = this.int();
result.creator = !!(result.flags & 1);
result.default = !!(result.flags & 2);
result.id = this.long();
result.access_hash = this.long();
result.slug = this.string();
result.title = this.string();
if (result.flags & 4) result.document = this.predicate();
if (result.flags & 8) result.settings = this.predicate();
result.installs_count = this.int();
return result;
  }],
  [4095653410, function() {
const result = { _: 'account.themesNotModified' };
return result;
  }],
  [2137482273, function() {
const result = { _: 'account.themes' };
result.hash = this.int();
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
  [2217196460, function() {
const result = { _: 'inputWallPaperNoFile' };
return result;
  }],
  [2331249445, function() {
const result = { _: 'wallPaperNoFile' };
result.flags = this.int();
result.default = !!(result.flags & 2);
result.dark = !!(result.flags & 16);
if (result.flags & 4) result.settings = this.predicate();
return result;
  }],
  [3176168657, function() {
const result = { _: 'inputThemeSettings' };
result.flags = this.int();
result.base_theme = this.predicate();
result.accent_color = this.int();
if (result.flags & 1) result.message_top_color = this.int();
if (result.flags & 1) result.message_bottom_color = this.int();
if (result.flags & 2) result.wallpaper = this.predicate();
if (result.flags & 2) result.wallpaper_settings = this.predicate();
return result;
  }],
  [2618595402, function() {
const result = { _: 'themeSettings' };
result.flags = this.int();
result.base_theme = this.predicate();
result.accent_color = this.int();
if (result.flags & 1) result.message_top_color = this.int();
if (result.flags & 1) result.message_bottom_color = this.int();
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
  [1123585836, function() {
const result = { _: 'updateMessagePollVote' };
result.poll_id = this.long();
result.user_id = this.int();
result.options = this.vector(this.bytes, false);
return result;
  }],
  [2727236953, function() {
const result = { _: 'messageUserVote' };
result.user_id = this.int();
result.option = this.bytes();
result.date = this.int();
return result;
  }],
  [909603888, function() {
const result = { _: 'messageUserVoteInputOption' };
result.user_id = this.int();
result.date = this.int();
return result;
  }],
  [244310238, function() {
const result = { _: 'messageUserVoteMultiple' };
result.user_id = this.int();
result.options = this.vector(this.bytes, false);
result.date = this.int();
return result;
  }],
  [136574537, function() {
const result = { _: 'messages.votesList' };
result.flags = this.int();
result.count = this.int();
result.votes = this.vector(this.predicate, false);
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
  [2907687357, function() {
const result = { _: 'messageInteractionCounters' };
result.msg_id = this.int();
result.views = this.int();
result.forwards = this.int();
return result;
  }],
  [3187114900, function() {
const result = { _: 'stats.broadcastStats' };
result.period = this.predicate();
result.followers = this.predicate();
result.views_per_post = this.predicate();
result.shares_per_post = this.predicate();
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
result.recent_message_interactions = this.vector(this.predicate, false);
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
  [3895575894, function() {
const result = { _: 'videoSize' };
result.flags = this.int();
result.type = this.string();
result.location = this.predicate();
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
  [418631927, function() {
const result = { _: 'statsGroupTopPoster' };
result.user_id = this.int();
result.messages = this.int();
result.avg_chars = this.int();
return result;
  }],
  [1611985938, function() {
const result = { _: 'statsGroupTopAdmin' };
result.user_id = this.int();
result.deleted = this.int();
result.kicked = this.int();
result.banned = this.int();
return result;
  }],
  [831924812, function() {
const result = { _: 'statsGroupTopInviter' };
result.user_id = this.int();
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
  [3198350372, function() {
const result = { _: 'globalPrivacySettings' };
result.flags = this.int();
if (result.flags & 1) result.archive_and_mute_new_noncontact_peers = this.predicate();
return result;
  }],
  [1708307556, function() {
const result = { _: 'updateChannelParticipant' };
result.flags = this.int();
result.channel_id = this.int();
result.date = this.int();
result.user_id = this.int();
if (result.flags & 1) result.prev_participant = this.predicate();
if (result.flags & 2) result.new_participant = this.predicate();
result.qts = this.int();
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
  [1854571743, function() {
const result = { _: 'updateChannelMessageForwards' };
result.channel_id = this.int();
result.id = this.int();
result.forwards = this.int();
return result;
  }],
  [1520986705, function() {
const result = { _: 'photoSizeProgressive' };
result.type = this.string();
result.location = this.predicate();
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
  [482860628, function() {
const result = { _: 'updateReadChannelDiscussionInbox' };
result.flags = this.int();
result.channel_id = this.int();
result.top_msg_id = this.int();
result.read_max_id = this.int();
if (result.flags & 1) result.broadcast_id = this.int();
if (result.flags & 1) result.broadcast_post = this.int();
return result;
  }],
  [1178116716, function() {
const result = { _: 'updateReadChannelDiscussionOutbox' };
result.channel_id = this.int();
result.top_msg_id = this.int();
result.read_max_id = this.int();
return result;
  }],
  [4124938141, function() {
const result = { _: 'messages.discussionMessage' };
result.flags = this.int();
result.messages = this.vector(this.predicate, false);
if (result.flags & 1) result.max_id = this.int();
if (result.flags & 2) result.read_inbox_max_id = this.int();
if (result.flags & 4) result.read_outbox_max_id = this.int();
result.chats = this.vector(this.predicate, false);
result.users = this.vector(this.predicate, false);
return result;
  }],
  [2799007587, function() {
const result = { _: 'messageReplyHeader' };
result.flags = this.int();
result.reply_to_msg_id = this.int();
if (result.flags & 1) result.reply_to_peer_id = this.predicate();
if (result.flags & 2) result.reply_to_top_id = this.int();
return result;
  }],
  [1093204652, function() {
const result = { _: 'messageReplies' };
result.flags = this.int();
result.comments = !!(result.flags & 1);
result.replies = this.int();
result.replies_pts = this.int();
if (result.flags & 2) result.recent_repliers = this.vector(this.predicate);
if (result.flags & 1) result.channel_id = this.int();
if (result.flags & 4) result.max_id = this.int();
if (result.flags & 8) result.read_max_id = this.int();
return result;
  }],
  [610945826, function() {
const result = { _: 'updatePeerBlocked' };
result.peer_id = this.predicate();
result.blocked = this.predicate();
return result;
  }],
  [3908927508, function() {
const result = { _: 'peerBlocked' };
result.peer_id = this.predicate();
result.date = this.int();
return result;
  }],
  [4280991391, function() {
const result = { _: 'updateChannelUserTyping' };
result.flags = this.int();
result.channel_id = this.int();
if (result.flags & 1) result.top_msg_id = this.int();
result.user_id = this.int();
result.action = this.predicate();
return result;
  }],
  [2902071934, function() {
const result = { _: 'inputMessageCallbackQuery' };
result.id = this.int();
result.query_id = this.long();
return result;
  }],
  [3284564331, function() {
const result = { _: 'channelParticipantLeft' };
result.user_id = this.int();
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
  [2240317323, function() {
const result = { _: 'updatePinnedChannelMessages' };
result.flags = this.int();
result.pinned = !!(result.flags & 1);
result.channel_id = this.int();
result.messages = this.vector(this.int, false);
result.pts = this.int();
result.pts_count = this.int();
return result;
  }],
  [464520273, function() {
const result = { _: 'inputMessagesFilterPinned' };
return result;
  }],
  [2308567701, function() {
const result = { _: 'stats.messageStats' };
result.views_graph = this.predicate();
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
]);
module.exports = parserMap;