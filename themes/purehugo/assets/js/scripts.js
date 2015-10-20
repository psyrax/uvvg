$(function(){
    $('.prettySocial').prettySocial();
    var loadedChan = false;
    var currentChannel = "";
    var onlineChannels;
    function checkChannels(){
    	$.ajax({
        	url: ' https://api.twitch.tv/kraken/streams?',
        	data: { 'channel' : 'fritangatv,jimrsng,thewiredfixer,pokemex,UsagiHimura,oso96_2000,leolambertini'},
        	dataType: 'jsonp',
        	success: function(data){
                onlineChannels = data.streams;
                console.log(data)
        		if ( data.streams.length > 0 ){
    
        			var selectedChannel = data.streams[0].channel;
        			
        			if ( !loadedChan ){
        				insertPlayer(selectedChannel);
        				loadedChan = true;
        			};
                    $('.statusCircle').removeClass('onlineCircle')
        			$.each(data.streams, function(index, stream){
                        $('#status-' + stream.channel.name + ' > i').addClass('onlineCircle');
                        $('#status-' + stream.channel.name).data('live', 'yes');
                        $('#status-' + stream.channel.name).data('channelindex', index);
        			});
    
        		};
        	},
        	error: function(){
        		checkChannels();
        	}
        });
	};
    function insertPlayer(channel){
    	var selectedChannel = channel.name;
        currentChannel = selectedChannel;
    	var displayName = channel.display_name;
    	var gameName = channel.game;
    	var template = '<h2><a href="http://twitch.tv/'+ selectedChannel +'/profile">'+ displayName +'</a> jugando: '+ gameName +'</h2><div class="embed video-player videoWrapper"><iframe height="378" width="100%" frameborder="0" scrolling="no" src="http://www.twitch.tv/' + selectedChannel + '/embed"></iframe></div>';
    	$('#streamZone').empty().append(template);
        
    };
    checkChannels();
    setInterval(function(){
    	checkChannels();
    }, 300000);
    $('.streamList').on('click', function(event){
        if ( $(this).data('live') == "yes" ){
            event.preventDefault();
            var index = $(this).data('channelindex');
            var channel = onlineChannels[index].channel;
            if ( channel.name != currentChannel ){
                insertPlayer(channel);
            };
        };
    })
});