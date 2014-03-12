let {interfaces: Ci, utils: Cu} = Components;

Cu.import("resource:///modules/imXPCOMUtils.jsm");
Cu.import("resource:///modules/jsProtoHelper.jsm");
Cu.import("resource:///modules/xmpp.jsm");
Cu.import("resource:///modules/xmpp-session.jsm");

function JappixAccount(aProtoInstance, aImAccount) {
  this._init(aProtoInstance, aImAccount);
}

JappixAccount.prototype = {
  __proto__: XMPPAccountPrototype,
  get canJoinChat() false,
  connect: function() {
    this._jid = this._parseJID(this.name.replace("@","\\40") + "@jappix.com/instantbird");
    this._connection = new XMPPSession("jappix.com", 5222,
                                       "opportunistic_tls", this._jid,
                                       this.imAccount.password, this);
  }
};

//XMPPSession(aHost, aPort, aSecurity, aJID, aPassword, aAccount)

function JappixProtocol() { }

JappixProtocol.prototype = {
  __proto__: GenericProtocolPrototype,
  get normalizedName() "jappix",
  get name() "Jappix",
  get iconBaseURI() "chrome://prpl-jappix/skin/",
  getAccount: function(aImAccount) new JappixAccount(this, aImAccount),
  classID: Components.ID("{a437c130-a9bc-11e3-a5e2-0800200c9a66}")
};

const NSGetFactory = XPCOMUtils.generateNSGetFactory([JappixProtocol]);
