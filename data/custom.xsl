<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0"
    xmlns:eg="http://www.tei-c.org/ns/Examples"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl"
    xmlns:exsl="http://exslt.org/common"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:fn="http://www.w3.org/2005/xpath-functions"
    extension-element-prefixes="exsl msxsl"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:html="http://www.w3.org/1999/xhtml"
    exclude-result-prefixes="xsl tei xd eg fn #default">

    <!-- import teibp.xsl, which allows templates, 
         variables, and parameters from teibp.xsl 
         to be overridden here. -->
    <xsl:import href="teibp.xsl"/>

    <!-- Override htmlShell -->
<xsl:template match="/" name="htmlShell" priority="99">
	 <html>
	   <xsl:call-template name="htmlHead"/>
	   <head>
		 <meta charset="utf-8" />
<!--		 <meta http-equiv="X-UA-Compatible" content="IE=edge" />-->
<!--		 <meta name="viewport" content="width=device-width" />-->
	   </head>
	   <body>
	     <xsl:if test="$includeToolbox = true()">
	       <xsl:call-template name="teibpToolbox"/>
	     </xsl:if>
	     <div id="tei_wrapper">
	       <xsl:apply-templates/>
	     </div>
	     <xsl:copy-of select="$htmlFooter"/>

	     <script type="text/javascript" src="{$teibpJS}"></script>
	     <script id="lessjs" src="{$lessJS}"></script>
	   </body>
<!--	     <script type="text/javascript" src='{rendererDisplay}'></script>-->
<!--	     <script type="text/javascript" src='js/rendererDisplay.js'></script>-->
<!--	     <script type="text/javascript" src="{indexrndrJS}"></script>-->
	 </html>
</xsl:template>

       <xsl:template match="@xml:id">
	 <!-- @xml:id is copied to @id, which browsers can use
	      for internal links.
	 -->
	     <xsl:attribute name="xml:id">
	     <xsl:value-of select="."/>
	     </xsl:attribute>
<!--    	 <xsl:attribute name="id">-->
<!--    	   <xsl:value-of select="."/>-->
<!--    	 </xsl:attribute>-->
       </xsl:template>

       <xsl:template name="addID">
	 <xsl:if test="not(ancestor::eg:egXML)">
	   <xsl:attribute name="id">
	     <xsl:choose>
	       <xsl:when test="@xml:id">
		 <xsl:value-of select="@xml:id"/>
	       </xsl:when>
	       <xsl:otherwise>
		 <xsl:call-template name="generate-unique-id">
		   <xsl:with-param name="root" select="generate-id()"/>
		 </xsl:call-template>
	       </xsl:otherwise>
	     </xsl:choose>
	   </xsl:attribute>
	 </xsl:if>
       </xsl:template>

       <!-- support for rtl-languages such as Arabic -->
       <!-- template to add the HTML @lang attribute based on the containing element -->
       <xsl:template name="templHtmlAttrLang">
         <xsl:param name="pInput"/>
         <xsl:choose>
           <xsl:when test="$pInput/@xml:lang">
             <xsl:attribute name="xml:lang">
               <xsl:value-of select="$pInput/@xml:lang"/>
             </xsl:attribute>
           </xsl:when>
           <xsl:otherwise>
             <xsl:attribute name="xml:lang">
               <xsl:value-of select="ancestor::node()[@xml:lang!=''][1]/@xml:lang"/>
             </xsl:attribute>
           </xsl:otherwise>
         </xsl:choose>
       </xsl:template>

  <xsl:param name="includeToolbox" select="false()"/>


</xsl:stylesheet>