package com.ifood.order.endpoint.service;

import com.ifood.order.endpoint.model.DatabaseSequence;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
@RequiredArgsConstructor
public class NextSequenceService {

    private final MongoOperations mongo;

    public long getNextSequence(String seqName) {
        DatabaseSequence counter = mongo.findAndModify(
                query(where("_id").is(seqName)),
                new Update().inc("sequence", 1),
                options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return counter.getSequence();
    }
}