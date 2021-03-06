// Copyright 2007 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('goog.i18n.bidiTest');
goog.setTestOnly('goog.i18n.bidiTest');

goog.require('goog.i18n.bidi');
goog.require('goog.i18n.bidi.Dir');
goog.require('goog.testing.jsunit');

var LRE = '\u202A';
var RLE = '\u202B';
var PDF = '\u202C';
var LRM = '\u200E';
var RLM = '\u200F';

function testToDir() {
  assertEquals(null, goog.i18n.bidi.toDir(null));
  assertEquals(null, goog.i18n.bidi.toDir(null, true));

  assertEquals(
      goog.i18n.bidi.Dir.NEUTRAL,
      goog.i18n.bidi.toDir(goog.i18n.bidi.Dir.NEUTRAL));
  assertEquals(null, goog.i18n.bidi.toDir(0, true));

  assertEquals(
      goog.i18n.bidi.Dir.LTR, goog.i18n.bidi.toDir(goog.i18n.bidi.Dir.LTR));
  assertEquals(
      goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.toDir(goog.i18n.bidi.Dir.LTR, true));
  assertEquals(goog.i18n.bidi.Dir.LTR, goog.i18n.bidi.toDir(100));
  assertEquals(goog.i18n.bidi.Dir.LTR, goog.i18n.bidi.toDir(100, true));
  assertEquals(goog.i18n.bidi.Dir.LTR, goog.i18n.bidi.toDir(false));
  assertEquals(goog.i18n.bidi.Dir.LTR, goog.i18n.bidi.toDir(false, true));

  assertEquals(
      goog.i18n.bidi.Dir.RTL, goog.i18n.bidi.toDir(goog.i18n.bidi.Dir.RTL));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.toDir(goog.i18n.bidi.Dir.RTL, true));
  assertEquals(goog.i18n.bidi.Dir.RTL, goog.i18n.bidi.toDir(-100));
  assertEquals(goog.i18n.bidi.Dir.RTL, goog.i18n.bidi.toDir(-100, true));
  assertEquals(goog.i18n.bidi.Dir.RTL, goog.i18n.bidi.toDir(true));
  assertEquals(goog.i18n.bidi.Dir.RTL, goog.i18n.bidi.toDir(true, true));
}

function testIsRtlLang() {
  assert(!goog.i18n.bidi.isRtlLanguage('en'));
  assert(!goog.i18n.bidi.isRtlLanguage('fr'));
  assert(!goog.i18n.bidi.isRtlLanguage('zh-CN'));
  assert(!goog.i18n.bidi.isRtlLanguage('fil'));
  assert(!goog.i18n.bidi.isRtlLanguage('az'));
  assert(!goog.i18n.bidi.isRtlLanguage('iw-Latn'));
  assert(!goog.i18n.bidi.isRtlLanguage('iw-LATN'));
  assert(!goog.i18n.bidi.isRtlLanguage('iw_latn'));
  assert(goog.i18n.bidi.isRtlLanguage('ar'));
  assert(goog.i18n.bidi.isRtlLanguage('AR'));
  assert(goog.i18n.bidi.isRtlLanguage('iw'));
  assert(goog.i18n.bidi.isRtlLanguage('he'));
  assert(goog.i18n.bidi.isRtlLanguage('fa'));
  assert(goog.i18n.bidi.isRtlLanguage('ckb'));
  assert(goog.i18n.bidi.isRtlLanguage('ckb-IQ'));
  assert(goog.i18n.bidi.isRtlLanguage('ar-EG'));
  assert(goog.i18n.bidi.isRtlLanguage('az-Arab'));
  assert(goog.i18n.bidi.isRtlLanguage('az-ARAB-IR'));
  assert(goog.i18n.bidi.isRtlLanguage('az_arab_IR'));
  // New for additions 2018-08-20
  assert(!goog.i18n.bidi.isRtlLanguage('ff'));
  assert(!goog.i18n.bidi.isRtlLanguage('ff_Latn'));
  assert(!goog.i18n.bidi.isRtlLanguage('ff-GN'));
  assert(goog.i18n.bidi.isRtlLanguage('ff-arab'));
  assert(goog.i18n.bidi.isRtlLanguage('ff_arab'));
  assert(goog.i18n.bidi.isRtlLanguage('ff-Arab'));
  assert(goog.i18n.bidi.isRtlLanguage('ff_Arab'));
  assert(goog.i18n.bidi.isRtlLanguage('ff-adlm'));
  assert(goog.i18n.bidi.isRtlLanguage('ff_adlm'));
  assert(goog.i18n.bidi.isRtlLanguage('ff-Adlm'));
  assert(goog.i18n.bidi.isRtlLanguage('ff_Adlm'));
  // Anything written in Adlam script is RTL
  assert(goog.i18n.bidi.isRtlLanguage('ha_Adlm'));

  // Rohnigya script.
  assert(goog.i18n.bidi.isRtlLanguage('rhg-Rohg'));
  assert(goog.i18n.bidi.isRtlLanguage('rhg_Rohg'));
  // Anything written in Rohingya script.
  assert(goog.i18n.bidi.isRtlLanguage('bn_Rohg'));

  // Any writing in Thaana
  assert(goog.i18n.bidi.isRtlLanguage('dv-thaa'));
  assert(goog.i18n.bidi.isRtlLanguage('dv-Thaa'));
  assert(goog.i18n.bidi.isRtlLanguage('chr-thaa'));

  // Test for incomplete script references
  assert(!goog.i18n.bidi.isRtlLanguage('ff-adl'));
  assert(!goog.i18n.bidi.isRtlLanguage('ff-Lat'));
  assert(!goog.i18n.bidi.isRtlLanguage('chr-tha'));
}

function testIsLtrChar() {
  assert(goog.i18n.bidi.isLtrChar('a'));
  assert(!goog.i18n.bidi.isLtrChar('\u05e0'));
  var str = 'a\u05e0z';
  assert(goog.i18n.bidi.isLtrChar(str.charAt(0)));
  assert(!goog.i18n.bidi.isLtrChar(str.charAt(1)));
  assert(goog.i18n.bidi.isLtrChar(str.charAt(2)));
  assert(!goog.i18n.bidi.isLtrChar(
      '7'));  // Closure treats ASCII digits as neutral.

  // LTR beyond the BMP
  assert(goog.i18n.bidi.isLtrChar('\uD804\uDD10'));  // Chakma block
  assert(goog.i18n.bidi.isLtrChar('\uD805\uDF00'));  // Ahom block
  assert(goog.i18n.bidi.isLtrChar('\uD801\uDCBA'));  // Osage block

  // Unicode 11 additions of LTR scripts
  assert(goog.i18n.bidi.isLtrChar('\uD806\uDC00'));  // Dogra block
  assert(goog.i18n.bidi.isLtrChar('\uD807\uDC64'));  // Gunjala Gondi
  assert(goog.i18n.bidi.isLtrChar('\uD807\uDEE2'));  // Makasar
  assert(goog.i18n.bidi.isLtrChar('\uD81B\uDE45'));  // Medefaidrin
}

function testIsRtlChar() {
  assert(!goog.i18n.bidi.isRtlChar('a'));
  assert(goog.i18n.bidi.isRtlChar('\u05e0'));
  var str = 'a\u05e0z';
  assert(!goog.i18n.bidi.isRtlChar(str.charAt(0)));
  assert(goog.i18n.bidi.isRtlChar(str.charAt(1)));
  assert(!goog.i18n.bidi.isRtlChar(str.charAt(2)));

  // New for additions 2018-08-20
  assert(goog.i18n.bidi.isRtlChar('\u0840'));  // Mandaic
  assert(goog.i18n.bidi.isRtlChar('\u085f'));  // Mandaic
  assert(goog.i18n.bidi.isRtlChar('\u0800'));  // Samaritan
  assert(goog.i18n.bidi.isRtlChar('\u083e'));  // Samaritan

  assert(goog.i18n.bidi.isRtlChar('\u0860'));  // Syriac Ext
  assert(goog.i18n.bidi.isRtlChar('\u086f'));  // Syriac Ext

  // RTL beyond the BMP
  assert(goog.i18n.bidi.isRtlChar(
      '\uD83A\uDD03'));                      // Adlam as 2 supplementary points.
  assert(goog.i18n.bidi.isRtlChar('\uD83A\uDD03'));  // Adlam
  assert(goog.i18n.bidi.isRtlChar('\uD83A\uDD5F'));  // Adlam
  assert(goog.i18n.bidi.isRtlChar('\uD83A\uDC00'));  // Mende Kikakui

  // Now the additional scripts
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDC00'));  // Cypriot Syllabary
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDC3F'));  // Cypriot Syllabary
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDC17'));  // Cypriot Syllabary
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDD00'));  // Phoenician
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDC40'));  // Imperial Aramaic
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDC5F'));  // Imperial Aramaic
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDE60'));  // Old South Arabian
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDE7F'));  // Old South Arabian
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDE9F'));  // Old North Arabian
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDE91'));  // Old North Arabian
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDF60'));  // Inscriptional Pahlavi
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDF7F'));  // Inscriptional Pahlavi
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDF80'));  // Psalter Pahlavi
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDFAF'));  // Psalter Pahlavi
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDF00'));  // Avestan
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDC80'));  // Nabataean
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDCAF'));  // Nabataean
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDE00'));  // Kharoshthi
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDE5F'));  // Kharoshthi
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDC00'));  // Old Turkic
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDC4F'));  // Old Turkic
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDD20'));  // Lydian
  assert(goog.i18n.bidi.isRtlChar('\uD802\uDD3F'));  // Lydian

  // Tests for scripts added in Unicode 11 and beyond
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDD00'));  // Rohingya
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDD2F'));
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDD30'));
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDD39'));
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDF30'));  // Sogdian
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDF51'));  // Sogdian numeral
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDF00'));  // Old Sogdian
  assert(goog.i18n.bidi.isRtlChar('\uD803\uDF17'));  // Old Sogdian
}

function testIsNeutralChar() {
  assert(goog.i18n.bidi.isNeutralChar('\u0000'));
  assert(goog.i18n.bidi.isNeutralChar('\u0020'));
  assert(goog.i18n.bidi.isNeutralChar(
      '7'));  // Closure treats ASCII digits as neutral.
  assert(!goog.i18n.bidi.isNeutralChar('a'));
  assert(goog.i18n.bidi.isNeutralChar('!'));
  assert(goog.i18n.bidi.isNeutralChar('@'));
  assert(goog.i18n.bidi.isNeutralChar('['));
  assert(goog.i18n.bidi.isNeutralChar('`'));
  assert(goog.i18n.bidi.isNeutralChar('0'));
  assert(!goog.i18n.bidi.isNeutralChar('\u05e0'));
}

function testIsNeutralText() {
  assert(goog.i18n.bidi.isNeutralText('123'));
  assert(!goog.i18n.bidi.isNeutralText('abc'));
  assert(goog.i18n.bidi.isNeutralText('http://abc'));
  assert(goog.i18n.bidi.isNeutralText(' 123-()'));
  assert(!goog.i18n.bidi.isNeutralText('123a456'));
  assert(!goog.i18n.bidi.isNeutralText('123\u05e0456'));
  assert(!goog.i18n.bidi.isNeutralText('<input value=\u05e0>123&lt;', false));
  assert(goog.i18n.bidi.isNeutralText('<input value=\u05e0>123&lt;', true));
  assert(goog.i18n.bidi.isNeutralText('(123)-4567!'));
  assert(!goog.i18n.bidi.isNeutralText('(123)-X4567!'));
  // A few neutral characters from SMP. This is an approximation!
  assert(!goog.i18n.bidi.isNeutralText('\uD800\uDD01\uD800\uDD9A\uD834\uDF55'));
}

function testHasAnyLtr() {
  assert(!goog.i18n.bidi.hasAnyLtr(''));
  assert(!goog.i18n.bidi.hasAnyLtr('\u05e0\u05e1\u05e2'));
  assert(goog.i18n.bidi.hasAnyLtr('\u05e0\u05e1z\u05e2'));
  assert(!goog.i18n.bidi.hasAnyLtr('123\t...  \n'));
  assert(goog.i18n.bidi.hasAnyLtr('<br>123&lt;', false));
  assert(!goog.i18n.bidi.hasAnyLtr('<br>123&lt;', true));
  assert(!goog.i18n.bidi.hasAnyLtr('\uD83A\uDD22\uD83A\uDD5E', true));
  assert(goog.i18n.bidi.hasAnyLtr('\u05e0\u05e1Q\u05e2\u05e3'));
}

function testHasAnyRtl() {
  assert(!goog.i18n.bidi.hasAnyRtl(''));
  assert(!goog.i18n.bidi.hasAnyRtl('abc'));
  assert(goog.i18n.bidi.hasAnyRtl('ab\u05e0c'));
  assert(!goog.i18n.bidi.hasAnyRtl('123\t...  \n'));
  assert(goog.i18n.bidi.hasAnyRtl('<input value=\u05e0>123', false));
  assert(!goog.i18n.bidi.hasAnyRtl('<input value=\u05e0>123', true));
  assert(goog.i18n.bidi.hasAnyRtl('A\uD83A\uDD22\uD83A\uDD15B', false));
  assert(goog.i18n.bidi.hasAnyRtl('\u05e0\u05e1a\u05e2Q\u05e3'));
}

function testEndsWithLtr() {
  assert(goog.i18n.bidi.endsWithLtr('a'));
  assert(goog.i18n.bidi.endsWithLtr('abc'));
  assert(goog.i18n.bidi.endsWithLtr('a (!)'));
  assert(goog.i18n.bidi.endsWithLtr('a.1'));
  assert(goog.i18n.bidi.endsWithLtr('http://www.google.com '));
  assert(goog.i18n.bidi.endsWithLtr('\u05e0a'));
  assert(goog.i18n.bidi.endsWithLtr(' \u05e0\u05e1a\u05e2\u05e3 a (!)'));
  assert(goog.i18n.bidi.endsWithLtr('\u202b\u05d0!\u202c\u200e'));
  assert(!goog.i18n.bidi.endsWithLtr(''));
  assert(!goog.i18n.bidi.endsWithLtr(' '));
  assert(!goog.i18n.bidi.endsWithLtr('1'));
  assert(!goog.i18n.bidi.endsWithLtr('\u05e0'));
  assert(!goog.i18n.bidi.endsWithLtr('\u05e0 1(!)'));
  assert(!goog.i18n.bidi.endsWithLtr('a\u05e0'));
  assert(!goog.i18n.bidi.endsWithLtr('a abc\u05e0\u05e1def\u05e2. 1'));
  assert(!goog.i18n.bidi.endsWithLtr('\u200f\u202eArtielish\u202c\u200f'));
  assert(!goog.i18n.bidi.endsWithLtr(' \u05e0\u05e1a\u05e2 &lt;', true));
  assert(goog.i18n.bidi.endsWithLtr(' \u05e0\u05e1a\u05e2 &lt;', false));
  assert(!goog.i18n.bidi.endsWithLtr('a\uD83A\uDD22\uD83A\uDD5E', false));
  assert(goog.i18n.bidi.endsWithLtr('\u05e0\ud804\udf7f', false));
}

function testEndsWithRtl() {
  assert(goog.i18n.bidi.endsWithRtl('\u05e0'));
  assert(goog.i18n.bidi.endsWithRtl('\u05e0\u05e1\u05e2'));
  assert(goog.i18n.bidi.endsWithRtl('\u05e0 (!)'));
  assert(goog.i18n.bidi.endsWithRtl('\u05e0.1'));
  assert(goog.i18n.bidi.endsWithRtl('http://www.google.com/\u05e0 '));
  assert(goog.i18n.bidi.endsWithRtl('a\u05e0'));
  assert(goog.i18n.bidi.endsWithRtl(' a abc\u05e0def\u05e3. 1'));
  assert(goog.i18n.bidi.endsWithRtl('\u200f\u202eArtielish\u202c\u200f'));
  assert(!goog.i18n.bidi.endsWithRtl(''));
  assert(!goog.i18n.bidi.endsWithRtl(' '));
  assert(!goog.i18n.bidi.endsWithRtl('1'));
  assert(!goog.i18n.bidi.endsWithRtl('a'));
  assert(!goog.i18n.bidi.endsWithRtl('a 1(!)'));
  assert(!goog.i18n.bidi.endsWithRtl('\u05e0a'));
  assert(!goog.i18n.bidi.endsWithRtl('\u202b\u05d0!\u202c\u200e'));
  assert(!goog.i18n.bidi.endsWithRtl('\u05e0 \u05e0\u05e1ab\u05e2 a (!)'));
  assert(goog.i18n.bidi.endsWithRtl(' \u05e0\u05e1a\u05e2 &lt;', true));
  assert(!goog.i18n.bidi.endsWithRtl(' \u05e0\u05e1a\u05e2 &lt;', false));
  assert(!goog.i18n.bidi.endsWithRtl('\uD83A\uDD2C\ud801\udc00', false));
  assert(goog.i18n.bidi.endsWithRtl('a\uD83A\uDD3A', false));
}

function testStartsWithLtr() {
  // Note that "startsWithLtr" actually means the first non-neutral character is
  // LTR
  assert(goog.i18n.bidi.startsWithLtr('X(123)-4567!'));
  assert(!goog.i18n.bidi.startsWithLtr('\u05e0(123)-4567!'));
  assert(!goog.i18n.bidi.startsWithLtr('(123)-4567!'));
}

function testStartsWithRtl() {
  // Note that "startsWithRtl" actually means the first non-neutral character is
  // RTL
  assert(!goog.i18n.bidi.startsWithRtl('X(123)-4567!'));
  assert(goog.i18n.bidi.startsWithRtl('\u05e0(123)-4567!'));
  assert(!goog.i18n.bidi.startsWithRtl('(123)-4567!'));
}

function testStartsWithNeutral() {
  // Checking that these first characters are not detected as LTR or RTL.
  assert(!goog.i18n.bidi.startsWithRtl('(123)-4567!'));
  assert(!goog.i18n.bidi.startsWithLtr('(123)-4567!'));

  assert(!goog.i18n.bidi.startsWithRtl('@*&~'));
  assert(!goog.i18n.bidi.startsWithLtr('@*&~'));

  assert(!goog.i18n.bidi.startsWithRtl('\uD800\uDD01\uD800\uDD9A'));
  // These are actually labeled as LTR.
  assert(goog.i18n.bidi.startsWithLtr('\uD800\uDD01\uD800\uDD9A'));
}

function testGuardBracketInText() {
  var strWithRtl = 'asc \u05d0 (\u05d0\u05d0\u05d0)';
  assertEquals(
      'asc \u05d0 \u200f(\u05d0\u05d0\u05d0)\u200f',
      goog.i18n.bidi.guardBracketInText(strWithRtl));
  assertEquals(
      'asc \u05d0 \u200f(\u05d0\u05d0\u05d0)\u200f',
      goog.i18n.bidi.guardBracketInText(strWithRtl, true));
  assertEquals(
      'asc \u05d0 \u200e(\u05d0\u05d0\u05d0)\u200e',
      goog.i18n.bidi.guardBracketInText(strWithRtl, false));

  var strWithRtl2 = '\u05d0 a (asc:))';
  assertEquals(
      '\u05d0 a \u200f(asc:))\u200f',
      goog.i18n.bidi.guardBracketInText(strWithRtl2));
  assertEquals(
      '\u05d0 a \u200f(asc:))\u200f',
      goog.i18n.bidi.guardBracketInText(strWithRtl2, true));
  assertEquals(
      '\u05d0 a \u200e(asc:))\u200e',
      goog.i18n.bidi.guardBracketInText(strWithRtl2, false));

  var strWithoutRtl = 'a (asc) {{123}}';
  assertEquals(
      'a \u200e(asc)\u200e \u200e{{123}}\u200e',
      goog.i18n.bidi.guardBracketInText(strWithoutRtl));
  assertEquals(
      'a \u200f(asc)\u200f \u200f{{123}}\u200f',
      goog.i18n.bidi.guardBracketInText(strWithoutRtl, true));
  assertEquals(
      'a \u200e(asc)\u200e \u200e{{123}}\u200e',
      goog.i18n.bidi.guardBracketInText(strWithoutRtl, false));
}

function testEnforceRtlInHtml() {
  var str = '<div> first <br> second </div>';
  assertEquals(
      '<div dir=rtl> first <br> second </div>',
      goog.i18n.bidi.enforceRtlInHtml(str));
  str = 'first second';
  assertEquals(
      '\n<span dir=rtl>first second</span>',
      goog.i18n.bidi.enforceRtlInHtml(str));
}

function testEnforceRtlInText() {
  var str = 'first second';
  assertEquals(
      RLE + 'first second' + PDF, goog.i18n.bidi.enforceRtlInText(str));
}

function testEnforceLtrInHtml() {
  var str = '<div> first <br> second </div>';
  assertEquals(
      '<div dir=ltr> first <br> second </div>',
      goog.i18n.bidi.enforceLtrInHtml(str));
  str = 'first second';
  assertEquals(
      '\n<span dir=ltr>first second</span>',
      goog.i18n.bidi.enforceLtrInHtml(str));
}

function testEnforceLtrInText() {
  var str = 'first second';
  assertEquals(
      LRE + 'first second' + PDF, goog.i18n.bidi.enforceLtrInText(str));
}

function testNormalizeHebrewQuote() {
  assertEquals('\u05d0\u05f4', goog.i18n.bidi.normalizeHebrewQuote('\u05d0"'));
  assertEquals('\u05d0\u05f3', goog.i18n.bidi.normalizeHebrewQuote('\u05d0\''));
  assertEquals(
      '\u05d0\u05f4\u05d0\u05f3',
      goog.i18n.bidi.normalizeHebrewQuote('\u05d0"\u05d0\''));
}

function testMirrorCSS() {
  var str = 'left:10px;right:20px';
  assertEquals('right:10px;left:20px', goog.i18n.bidi.mirrorCSS(str));
  str = 'border:10px 20px 30px 40px';
  assertEquals('border:10px 40px 30px 20px', goog.i18n.bidi.mirrorCSS(str));
}

function testEstimateDirection() {
  assertEquals(
      goog.i18n.bidi.Dir.NEUTRAL, goog.i18n.bidi.estimateDirection('', false));
  assertEquals(
      goog.i18n.bidi.Dir.NEUTRAL, goog.i18n.bidi.estimateDirection(' ', false));
  assertEquals(
      goog.i18n.bidi.Dir.NEUTRAL,
      goog.i18n.bidi.estimateDirection('! (...)', false));
  assertEquals(
      goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.estimateDirection('All-Ascii content', false));
  assertEquals(
      goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.estimateDirection('-17.0%', false));
  assertEquals(
      'Farsi digits should count as weakly LTR', goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.estimateDirection('\u06f0', false));
  assertEquals(
      'Farsi digits should count as weakly LTR', goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.estimateDirection('\u06f9', false));
  assertEquals(
      goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.estimateDirection('http://foo/bar/', false));
  assertEquals(
      goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.estimateDirection(
          'http://foo/bar/?s=\u05d0\u05d0\u05d0\u05d0\u05d0\u05d0' +
              '\u05d0\u05d0\u05d0\u05d0\u05d0\u05d0\u05d0\u05d0\u05d0' +
              '\u05d0\u05d0\u05d0\u05d0\u05d0\u05d0\u05d0\u05d0\u05d0',
          false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection('\u05d0', false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection('9 \u05d0 -> 17.5, 23, 45, 19', false));
  assertEquals(
      'Native arabic numbers should count as RTL', goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection('\u0660', false));
  assertEquals(
      'Native adlam numbers should count as RTL', goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection('\uD83A\uDD55', false));
  assertEquals(
      'Both Farsi letters and digits should count as RTL',
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection('\u06CC \u06F1 \u06F2\u06F3', false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL, goog.i18n.bidi.estimateDirection(
                                  'http://foo/bar/ \u05d0 http://foo2/bar2/ ' +
                                      'http://foo3/bar3/',
                                  false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection(
          '\u05d0\u05d9\u05df \u05de\u05de\u05e9 ' +
              '\u05de\u05d4 \u05dc\u05e8\u05d0\u05d5\u05ea: ' +
              '\u05dc\u05d0 \u05e6\u05d9\u05dc\u05de\u05ea\u05d9 ' +
              '\u05d4\u05e8\u05d1\u05d4 \u05d5\u05d2\u05dd \u05d0' +
              '\u05dd \u05d4\u05d9\u05d9\u05ea\u05d9 \u05de\u05e6' +
              '\u05dc\u05dd, \u05d4\u05d9\u05d4 \u05e9\u05dd',
          false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection(
          '\u05db\u05d0 - http://geek.co.il/gallery/v/2007-06' +
              ' - \u05d0\u05d9\u05df \u05de\u05de\u05e9 \u05de\u05d4 ' +
              '\u05dc\u05e8\u05d0\u05d5\u05ea: \u05dc\u05d0 \u05e6' +
              '\u05d9\u05dc\u05de\u05ea\u05d9 \u05d4\u05e8\u05d1 ' +
              '\u05d5\u05d2\u05dd \u05d0\u05dd \u05d4\u05d9\u05d9' +
              '\u05d9 \u05de\u05e6\u05dc\u05dd, \u05d4\u05d9\u05d4 ' +
              '\u05e9\u05dd \u05d1\u05e2\u05d9\u05e7 \u05d4\u05e8' +
              '\u05d1\u05d4 \u05d0\u05e0\u05e9\u05d9\u05dd. \u05de' +
              '\u05d4 \u05e9\u05db\u05df - \u05d0\u05e4\u05e9\u05e8 ' +
              '\u05dc\u05e0\u05e6\u05dc \u05d0\u05ea \u05d4\u05d4 ' +
              '\u05d3\u05d6\u05de\u05e0\u05d5 \u05dc\u05d4\u05e1' +
              '\u05ea\u05db\u05dc \u05e2\u05dc \u05db\u05de\u05d4 ' +
              '\u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e9' +
              '\u05e9\u05e2\u05d5\u05ea \u05d9\u05e9\u05e0\u05d5 ' +
              '\u05d9\u05d5\u05ea\u05e8 \u05e9\u05d9\u05e9 \u05dc' +
              '\u05d9 \u05d1\u05d0\u05ea\u05e8',
          false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection(
          'CAPTCHA \u05de\u05e9\u05d5\u05db\u05dc\u05dc ' +
              '\u05de\u05d3\u05d9?',
          false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection(
          'Yes Prime Minister \u05e2\u05d3\u05db\u05d5\u05df. ' +
              '\u05e9\u05d0\u05dc\u05d5 \u05d0\u05d5\u05ea\u05d9 ' +
              '\u05de\u05d4 \u05d0\u05e0\u05d9 \u05e8\u05d5\u05e6' +
              '\u05d4 \u05de\u05ea\u05e0\u05d4 \u05dc\u05d7\u05d2',
          false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection(
          '17.4.02 \u05e9\u05e2\u05d4:13-20 .15-00 .\u05dc\u05d0 ' +
              '\u05d4\u05d9\u05d9\u05ea\u05d9 \u05db\u05d0\u05df.',
          false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL, goog.i18n.bidi.estimateDirection(
                                  '5710 5720 5730. \u05d4\u05d3\u05dc\u05ea. ' +
                                      '\u05d4\u05e0\u05e9\u05d9\u05e7\u05d4',
                                  false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection(
          '\u05d4\u05d3\u05dc\u05ea http://www.google.com ' +
              'http://www.gmail.com',
          false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection('\u200f\u202eArtielish\u202c\u200f'));
  assertEquals(
      goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.estimateDirection(
          '\u05d4\u05d3\u05dc <some quite nasty html mark up>', false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection(
          '\u05d4\u05d3\u05dc <some quite nasty html mark up>', true));
  assertEquals(
      goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.estimateDirection(
          '\u05d4\u05d3\u05dc\u05ea &amp; &lt; &gt;', false));
  assertEquals(
      goog.i18n.bidi.Dir.RTL,
      goog.i18n.bidi.estimateDirection(
          '\u05d4\u05d3\u05dc\u05ea &amp; &lt; &gt;', true));
  assertEquals(
      goog.i18n.bidi.Dir.LTR,
      goog.i18n.bidi.estimateDirection('foo/<b>\u05d0</b>', true));
}

function testDetectRtlDirectionality() {
  var bidiText = getBidiTextSamples();
  for (var i = 0; i < bidiText.length; i++) {
    // alert(bidiText[i].text);
    var is_rtl = goog.i18n.bidi.detectRtlDirectionality(
        bidiText[i].text, bidiText[i].isHtml);
    if (is_rtl != bidiText[i].isRtl) {
      var str = '"' + bidiText[i].text + '" should be ' +
          (bidiText[i].isRtl ? 'rtl' : 'ltr') + ' but detected as ' +
          (is_rtl ? 'rtl' : 'ltr');
      alert(str);
    }
    assertEquals(bidiText[i].isRtl, is_rtl);
  }
}

function testSetElementDirByTextDirectionality() {
  var el = document.createElement('DIV');

  var text = '';
  goog.i18n.bidi.setElementDirByTextDirectionality(el, text);
  assertEquals('Expected no/empty dir value for empty text.', '', el.dir);

  text = ' ';
  goog.i18n.bidi.setElementDirByTextDirectionality(el, text);
  assertEquals(
      'Expected no/empty dir value for neutral text:"' + text + '"', '',
      el.dir);

  text = 'a';
  goog.i18n.bidi.setElementDirByTextDirectionality(el, text);
  assertEquals(
      'Expected dir="ltr" value for LTR text:"' + text + '"', 'ltr', el.dir);

  text = '\u05d0';
  goog.i18n.bidi.setElementDirByTextDirectionality(el, text);
  assertEquals(
      'Expected dir="rtl" value for RTL text:"' + text + '"', 'rtl', el.dir);
}

/**
 * Creates simple object with text and also direction and HTML flags
 * return {Object<string, boolean, boolean>}
 * @private
 */
function SampleItem() {
  this.text = '';
  this.isRtl = false;
  this.isHtml = false;
}

/**
 * Creates an array of BiDi text objects for testing,
 * setting the direction and HTML flags appropriately.
 * @return {Array<Object<string, boolean, boolean>>}
 * @private
 */
function getBidiTextSamples() {
  var bidiText = [];
  var item = new SampleItem;
  item.text = 'Pure Ascii content';
  item.isRtl = false;
  bidiText.push(item);

  item = new SampleItem;
  item.text = '\u05d0\u05d9\u05df \u05de\u05de\u05e9 \u05de\u05d4 ' +
      '\u05dc\u05e8\u05d0\u05d5\u05ea: \u05dc\u05d0 ' +
      '\u05e6\u05d9\u05dc\u05de\u05ea\u05d9 \u05d4\u05e8\u05d1\u05d4 ' +
      '\u05d5\u05d2\u05dd \u05d0\u05dd \u05d4\u05d9\u05d9\u05ea\u05d9 ' +
      '\u05de\u05e6\u05dc\u05dd, \u05d4\u05d9\u05d4 \u05e9\u05dd';
  item.isRtl = true;
  bidiText.push(item);

  item = new SampleItem;
  item.text = '\u05db\u05d0\u05df - http://geek.co.il/gallery/v/2007-06 - ' +
      '\u05d0\u05d9\u05df \u05de\u05de\u05e9 \u05de\u05d4 ' +
      '\u05dc\u05e8\u05d0\u05d5\u05ea: ' +
      '\u05dc\u05d0 \u05e6\u05d9\u05dc\u05de\u05ea\u05d9 ' +
      '\u05d4\u05e8\u05d1\u05d4 \u05d5\u05d2\u05dd \u05d0\u05dd ' +
      '\u05d4\u05d9\u05d9\u05ea\u05d9 \u05de\u05e6\u05dc\u05dd, ' +
      '\u05d4\u05d9\u05d4 \u05e9\u05dd \u05d1\u05e2\u05d9\u05e7\u05e8 ' +
      '\u05d4\u05e8\u05d1\u05d4 \u05d0\u05e0\u05e9\u05d9\u05dd. ' +
      '\u05de\u05d4 \u05e9\u05db\u05df - \u05d0\u05e4\u05e9\u05e8 ' +
      '\u05dc\u05e0\u05e6\u05dc \u05d0\u05ea ' +
      '\u05d4\u05d4\u05d3\u05d6\u05de\u05e0\u05d5\u05ea ' +
      '\u05dc\u05d4\u05e1\u05ea\u05db\u05dc \u05e2\u05dc \u05db\u05de\u05d4 ' +
      '\u05ea\u05de\u05d5\u05e0\u05d5\u05ea ' +
      '\u05de\u05e9\u05e2\u05e9\u05e2\u05d5\u05ea ' +
      '\u05d9\u05e9\u05e0\u05d5\u05ea \u05d9\u05d5\u05ea\u05e8 ' +
      '\u05e9\u05d9\u05e9 \u05dc\u05d9 \u05d1\u05d0\u05ea\u05e8';
  item.isRtl = true;
  bidiText.push(item);

  item = new SampleItem;
  item.text =
      'CAPTCHA \u05de\u05e9\u05d5\u05db\u05dc\u05dc \u05de\u05d3\u05d9?';
  item.isRtl = true;
  bidiText.push(item);


  item = new SampleItem;
  item.text = 'Yes Prime Minister \u05e2\u05d3\u05db\u05d5\u05df. ' +
      '\u05e9\u05d0\u05dc\u05d5 \u05d0\u05d5\u05ea\u05d9 \u05de\u05d4 ' +
      '\u05d0\u05e0\u05d9 \u05e8\u05d5\u05e6\u05d4 \u05de\u05ea\u05e0\u05d4 ' +
      '\u05dc\u05d7\u05d2';
  item.isRtl = true;
  bidiText.push(item);

  item = new SampleItem;
  item.text = '17.4.02 \u05e9\u05e2\u05d4:13-20 .15-00 .\u05dc\u05d0 ' +
      '\u05d4\u05d9\u05d9\u05ea\u05d9 \u05db\u05d0\u05df.';
  item.isRtl = true;
  bidiText.push(item);

  item = new SampleItem;
  item.text = '5710 5720 5730. \u05d4\u05d3\u05dc\u05ea. ' +
      '\u05d4\u05e0\u05e9\u05d9\u05e7\u05d4';
  item.isRtl = true;
  bidiText.push(item);

  item = new SampleItem;
  item.text =
      '\u05d4\u05d3\u05dc\u05ea http://www.google.com http://www.gmail.com';
  item.isRtl = true;
  bidiText.push(item);

  item = new SampleItem;
  item.text = '&gt;\u05d4&lt;';
  item.isHtml = true;
  item.isRtl = true;
  bidiText.push(item);

  item = new SampleItem;
  item.text = '&gt;\u05d4&lt;';
  item.isHtml = false;
  item.isRtl = false;
  bidiText.push(item);

  return bidiText;
}
